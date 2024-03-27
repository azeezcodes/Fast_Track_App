import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, collection, orderBy } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import PostItem from './PostItem';

export default function LatestItem() {
  const [latestItem, setLatestItem] = useState([])
  useEffect(() => {
    getLatestItem()
  }, [])
  const getLatestItem = async () => {
    setLatestItem([])
    await getDocs(collection(db, "UserPost"), orderBy('createdAt','desc')).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setLatestItem((prev) => [...prev, doc.data()]);
      });
    });
  }
  return (
    <View className="mt-6">
      <Text className="text-lg text-green-950 font-semibold mb-4">Latest Item List</Text>
      <FlatList data={latestItem} numColumns={2} renderItem={({ item, index }) => (
        <PostItem item={item}/>
      )} />
    </View>
  )
}