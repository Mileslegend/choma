
import React from 'react'
import {Redirect, Slot, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {View, Image, Text} from "react-native";
import {images} from "@/constants";
import cn from "clsx";
//import {TabBarIcon} from "@react-navigation/bottom-tabs/src/views/TabBarIcon";

const TabBarIcon = ({ focused, icon, title}: TabBarIconProps) => (
    <View className={'tab-icon'}>
        <Image source = {icon} resizeMode={'contain'} className={'size-7 '} tintColor={focused ? '#fe8c00' : '#5d5f6d'} />
        <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
)

const TabLayout = () => {
    //const isAuthenticated = true;

    const { isAuthenticated } = useAuthStore()

    if(!isAuthenticated) return <Redirect href='/sign-in' />
    return (
       <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
            borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                marginHorizontal: 20,
                height: 80,
                position: 'absolute',
                bottom: 40,
                shadowRadius: 4,
                elevation: 5,
                shadowOpacity: 0.1,
                backgroundColor: '#fff',
                shadowColor: '#1a1a1a',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
        }
        }}
       >
           <Tabs.Screen
           name="index"
           options={{
               title: 'Home',
               tabBarIcon: ({focused}) => <TabBarIcon title={'Home'} icon={images.home} focused={focused} />

           }}
           />
           <Tabs.Screen
               name="search"
               options={{
                   title: 'Search',
                   tabBarIcon: ({focused}) => <TabBarIcon title={'Search'} icon={images.search} focused={focused} />

               }}
           />
           <Tabs.Screen
               name="cart"
               options={{
                   title: 'Cart',
                   tabBarIcon: ({focused}) => <TabBarIcon title={'Cart'} icon={images.bag} focused={focused} />

               }}
           />
           <Tabs.Screen
               name="profile"
               options={{
                   title: 'Profile',
                   tabBarIcon: ({focused}) => <TabBarIcon title={'Profile'} icon={images.person} focused={focused} />

               }}
           />
       </Tabs>
    )
}
export default TabLayout
