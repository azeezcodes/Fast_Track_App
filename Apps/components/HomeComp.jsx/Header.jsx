import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {
    const {user} = useUser()
    return (
        <>
          
    <View className="flex flex-row items-center gap-4">
       <Image source={{uri: user?.imageUrl}} className="rounded-full w-10 h-10 " /> 
          <Text className="text-base text-gray-500 font-extrabold"> Hi {user?.fullName}</Text>         
            </View>
            <View className="rounded-2xl  items-start px-5 h-10 bg-white mt-5 border">
                <TextInput placeholder='search....' className="font-normal text-base" onChangeText={(value)=> console.log(value)}/>
            </View>
        </>
  )
}