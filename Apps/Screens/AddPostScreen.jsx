import { View, Text, TextInput, TouchableOpacity, Button, Image, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddPostScreen() {
    const [categories, setCategories] = useState([]);
    //image picker code
    const [image, setImage] = useState(null);
    const storage = getStorage();
    //getting current user details
    const { user } = useUser();
    //getting current user details

    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    //  end   image picker code

    //firebase code

    useEffect(() => {
        getCategoryList();
    }, []);
    const getCategoryList = async () => {
        setCategories([])
        await getDocs(collection(db, "Category")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setCategories((prev) => [...prev, doc.data()]);
            });
        });
    };
    //    End firebase code
    const onSubmitImage = async (value) => {
        setLoading(true);
        //convert uri to blob file format for firebase upload'
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, 'file/' + Date.now() + '.jpg');

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).then((resp) => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
                console.log('Download', downloadUrl)
                value.image = downloadUrl;
                value.userName = user.fullName;
                value.userEmail = user.primaryEmailAddress.emailAddress || '';
                value.userImage = user.imageUrl || '';
                // adding image url to firebase
                const docRef = await addDoc(collection(db, "UserPost"), value);
                if (docRef.id) {
                    console.log('document added', docRef.id);
                    setLoading(false);
                    Alert.alert('Success', 'Document added');
                    
                    
                }
            })
        });

    };

    return (
        <KeyboardAvoidingView>
        <ScrollView className='px-8'>
            <Text className='text-center my-8 font-bold text-3xl'>Add Your Post</Text>
            <Text className='text-center my-4 font-semibold text-base text-grey-400'>Add Your Post</Text>
            <Formik
                initialValues={{
                    userName: "",
                    userEmail: "",
                    userImage: "",
                    title: "",
                    desc: "",
                    category: "",
                    address: "",
                    price: "",
                        image: "",
                    createdAt: Date.now(),
                }}
                onSubmit={(value) => onSubmitImage(value)}
            >
                {({ handleBlur, handleChange, handleSubmit, values, setFieldValue, errors }) => (
                    <View>
                        <Text className="font-thin text-sm text-gray-700 mb-1">Click to add Image</Text>
                        <TouchableOpacity onPress={pickImage}>
                            {image ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 20, borderColor: 'green', borderWidth: 4 }} /> : <Image source={require('../../assets/favicon.png')} style={{ width: 100, height: 100, borderRadius: 20, borderColor: 'green', borderWidth: 4 }} />}

                        </TouchableOpacity>
                        <Text className="text-left font-semibold text-base text-grey-400 mt-4">Title</Text>
                        <TextInput
                            placeholder="Title"
                            className="border border-[#00635D] mt-1 mb-4 rounded p-6 px-8 font-medium"
                            value={values?.title}
                            onChangeText={handleChange("title")}
                        />
                        <Text className="text-left font-semibold text-base text-grey-400">Description</Text>
                        <TextInput
                            placeholder="Description"
                            className="border border-[#00635D] mt-1 mb-4 rounded p-6 px-8 font-medium"
                            value={values?.desc}
                            numberOfLines={5}
                            onChangeText={handleChange("desc")}
                        />
                        <Text className="text-left font-semibold text-base text-grey-400">Address</Text>
                        <TextInput
                            placeholder="Address"
                            className="border border-[#00635D] mt-1 mb-4 rounded p-6 px-8 font-medium"
                            value={values?.address}
                            onChangeText={handleChange("address")}
                        />
                        <Text className="text-left font-semibold text-base text-grey-400">Price</Text>
                        <TextInput
                            placeholder="Price"
                            keyboardType="number-pad"
                            className="border border-[#00635D] mt-1 mb-4 rounded p-6 px-8 font-medium"
                            value={values?.price}
                            onChangeText={handleChange("price")}
                        />
                        <Text className="text-left font-semibold text-base text-grey-400">Category</Text>
                        <View style={{ borderWidth: 1, borderColor: '#00635D', borderRadius: 4 }}>

                            <Picker
                                selectedValue={values?.category}
                                onValueChange={(itemVal, index) => setFieldValue('category', itemVal)}
                                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}

                            >
                                <Picker.Item label="Select a category" value="" />

                                {!categories && (<Picker.Item label="Select a category" value="" />)}

                                {categories.map((item, index) => (
                                    <Picker.Item value={item?.name} label={item?.name} key={index} />
                                ))}
                            </Picker>

                        </View>
                        <TouchableOpacity
                            className="mx-auto mt-7 rounded-lg px-8 py-4 bg-[#00635D] mb-20"
                            onPress={handleSubmit}
                            style={{ backgroundColor: loading ? "#ccc" : "#007BFF" }}
                            disabled={loading}
                        >
                            {loading ? <ActivityIndicator color="#fff" /> : <Text className="font-black text-white text-base">
                                Submit
                            </Text>}

                        </TouchableOpacity>

                    </View>
                )}
            </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
