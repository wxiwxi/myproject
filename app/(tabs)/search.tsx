import { StyleSheet, Text, View,Image ,FlatList} from 'react-native'
import React,{useEffect,useState} from 'react'
import { images } from '@/constants/images'
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from '@/services/appwrite';

const search = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const {
    data: movies,
    loading: loading,
    error: error,
    refetch: refetchMovies,
    reset: resetMovies
  } = useFetch(() => fetchMovies({
    query: searchText
  }),false)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchText.trim()) {
        await refetchMovies().then((result:any) => {
          updateSearchCount(searchText, result[0]);
        })
      } else {
        resetMovies()
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [searchText])


  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0'
        resizeMode='cover'/>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View className="w-[120px]">
            <MovieCard
              {...item}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingVertical: 100 }}
        ListHeaderComponent={
          <>
            <SearchBar value={searchText} onChangeHandler={(text) => setSearchText(text)} placeholder="Search for a movie" />
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchText.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ):null
        }
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})