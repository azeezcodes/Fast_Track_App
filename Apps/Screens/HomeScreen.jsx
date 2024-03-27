import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/HomeComp.jsx/Header'
import Slider from '../components/HomeComp.jsx/Slider'
import CategoryHome from '../components/HomeComp.jsx/CategoryHome'
import LatestItem from '../components/HomeComp.jsx/LatestItem'

export default function HomeScreen() {
  return (
    <View className="p-8">
      <Header /> 
      <Slider /> 
      <CategoryHome />
      <LatestItem />
    </View>
  )
}