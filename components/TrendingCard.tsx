/*
 * @Author: Wangxin
 * @Descripttion: 
 * @Date: 2025-04-20 14:00:23
 * @LastEditTime: 2025-04-20 14:11:27
 */
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images';


const TrendingCard = ({id,poster_path,title,vote_average,release_date}:Movie) => {
  return (
    <Link href={`movies/${id}`} asChild>
      <TouchableOpacity>
        <Image
          source={{
            uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`:'https://placehoud.co/500x400/1a1a1a/ffffff.png'
          }}
          className="w-full h-52 rounded-lg"
          resizeMode='cover'
        />
        <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
      
    </Link>
  )
}

export default TrendingCard

const styles = StyleSheet.create({})