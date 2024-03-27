import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";


export default function Slider() {
    const [slider, setSlider] = useState([])
    useEffect(() => {
        getSlider()
    }, [])
    const getSlider = async () => {
        setSlider([])
        await getDocs(collection(db, "Slider")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setSlider((prev) => [...prev, doc.data()]);
            });
        });
    }
    return (
        <View className="mt-5">
            <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View> 
                        <Image source={{uri:item?.name}} className="h-40 w-48 mr-3 rounded-md object-contain" /> 
                    </View>
                )} />
        </View>
    )
}