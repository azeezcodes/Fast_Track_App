import { View, Text } from 'react-native'
import React from 'react'

export default function PostItem({item}) {
  return (
      <TouchableOpacity className="flex-1 m-2 rounded-lg p-2">
          <Image source={{ uri: item.image }} className="w-full h-[140px] rounded-md bottom-0.5" />
          <View>
              <Text className="text-xs font-extrabold mt-2">{item.category}</Text>
              <Text className="text-sm font-bold mt-2">{item.title}</Text>
              <Text className="text-sm font-bold mt-2  text-green-950">${item.price || 0}</Text>
          </View>
      </TouchableOpacity>
  )
}