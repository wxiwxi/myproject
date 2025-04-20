 import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Text, View, Image, ScrollView, ActivityIndicator,FlatList } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { fetchTrendingMovies } from "@/services/appwrite";
import MaskedView from '@react-native-masked-view/masked-view';




export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(() => fetchTrendingMovies())

  const {
    data: movies,
    loading: moviesLoading,
    error:moviesError
  } = useFetch(() => fetchMovies({
    query:''
  }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom:10
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
            <Text>Error:{moviesError?.message || trendingError?.message}</Text>
          ) : (
              <View className="flex-1 mt-5">
                <SearchBar onPressHandler={() => {
                  router.push("/search");
                }} placeholder="Search for a movie" />

                {
                  trendingMovies && (
                    <View className="flex-1 mt-10">
                      <Text className="text-lg text-white font-bold mt-5 mb-3">Trending Movies</Text>
                    </View>
                  )
                }
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={()=> <View className="w-4"/>}
                    className="mb-4 mt-3 px-6"
                    data={trendingMovies}
                    renderItem={({ item,index }) => (
                      <View className="w-[120px] relative">
                        <TrendingCard
                          id={item.movie_id}
                          poster_path={item.poster_url}
                          title={item.title}
                          vote_average={item.count}
                          release_date={String(item.count)}
                        />
                        <View className="absolute bottom-3 -left-6 px-2 py-1 rounded-full">
                          <MaskedView maskElement={
                            <Text className="font-bold text-white text-6xl">{index + 1}</Text>
                          }>
                            <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
                          </MaskedView>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item)=> item.movie_id.toString()}
                  />

                  <Text className="text-lg text-white font-bold mt-5 mb-3">Lastst Movies</Text>
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
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent: "flex-start",
                      gap: 20,
                      paddingRight:5,
                      marginBottom:10
                    }}
                    className="my-2 pd-32 pb-24"
                    scrollEnabled={false}
                  />
                </>
              </View>
        )}
        
      </ScrollView>
    </View>
  );
}
  