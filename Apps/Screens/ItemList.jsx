import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, where } from "@firebase/firestore";
import { useRoute } from "@react-navigation/native";

const ItemList = () => {
   const [currentItem, setCurrentItem] = useState([]);
   const { params } = useRoute;

   useEffect(() => {
      params && getItemListByCategory();
   }, [params]);
   const getItemListByCategory = async () => {
      setCurrentItem([]);
      await getDocs(
         collection(db, "UserPost"),
         where("category", "==", params.category)
      ).then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            setCurrentItem((prev) => [...prev, doc.data()]);
         });
      });
   };
   return (
     <View className="mt-6">
       <Text className="text-lg text-green-950 font-semibold mb-4">Latest Item List</Text>
       <FlatList data={currentItem} numColumns={2} renderItem={({ item, index }) => (
         <PostItem item={item} />
       )} />
     </View>
   );
};

export default ItemList;
