import { StyleSheet, Text, View,Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'


interface Props {
  placeholder: string;
  value?: string;
  onPressHandler?: () => void;
  onChangeHandler?: (text: string) => void
}
const SearchBar = ({ onPressHandler, placeholder, value ,onChangeHandler}:Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
      <TextInput
        onPress={onPressHandler}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeHandler}
        placeholderTextColor="#ab8bff"
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})