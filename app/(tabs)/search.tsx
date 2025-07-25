import {View, Text, Button, FlatList} from 'react-native'
import React, {useEffect} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import useAppwrite from "@/lib/useAppwrite";
import {getCategories, getMenu} from "@/lib/appwrite";
import {useLocalSearchParams} from "expo-router";
import CartButton from "@/components/CartButton";
import cn from "clsx";

const Search = () => {

    const { category, query } = useLocalSearchParams<{query: string; category: string}>()

    const { data, refetch, loading } = useAppwrite({
        fn: getMenu,
        params: {
            category,
            query,
            limit: 6
        }
    });

    const { data: categories } = useAppwrite({ fn: getCategories })

    useEffect(() => {
        refetch({ category, query, limit: 6 })
    }, [category, query]);

    return (
        <SafeAreaView className={'bg-white h-full'} >
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;
                    return (
                        <View className={cn('flex-1 max-w-[48%]', !isFirstRightColItem ? 'mt-10' : 'mt-0')}>
                            <Text>Menu Card</Text>
                        </View>
                    )
                }}
                keyExtractor={item => item.$id}
                numColumns={2}
                columnWrapperClassName={'gap-7'}
                contentContainerClassName={'gap-7 px-5 pb-32'}
                ListHeaderComponent={() => (
                    <View className={'gap-5 my-5'}>
                        <View className={'flex-between flex-row w-full'}>
                            <View className={'flex-start'}>
                                <Text className={'small-bold text-primary uppercase'}>
                                    Search
                                </Text>
                                <View className={'flex-start flex-row gap-x-1 mt-0.5'}>
                                    <Text className={'paragraph-semibold text-dark-100'}>Find your favorite food</Text>
                                </View>
                            </View>

                            <CartButton />
                        </View>
                        <Text>Search Input</Text>
                        <Text>Filter</Text>
                    </View>)}
                ListEmptyComponent={() => !loading && <Text>No results found</Text>}
            />

        </SafeAreaView>
    )
}
export default Search
