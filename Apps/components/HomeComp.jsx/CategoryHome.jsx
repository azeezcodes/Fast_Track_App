import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';



export default function CategoryHome() {

  const navigation = useNavigation();
  const [category, setCategory] = useState([])
  useEffect(() => {
    getCategory()
  }, [])
  const getCategory = async () => {
    setCategory([])
    await getDocs(collection(db, "Category")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setCategory((prev) => [...prev, doc.data()]);
      });
    });
  }
  return (
    <View className="mt-6">
      <Text className="text-lg text-green-950 font-semibold mb-4">Category List</Text>
      <FlatList
        data={category}
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('item-list', {
              category:item.name
            })}
            className="w-20 h-20 bg-slate-100 rounded-lg border border-green-800 flex mr-0.5 mb-2 items-center justify-center ">
            <Text className="text-base font-black uppercase" >{ item.name}</Text>
          </TouchableOpacity>
        )} />
    </View>
  )
}