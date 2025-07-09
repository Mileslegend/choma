import {View, Text, Button} from 'react-native'
import React from 'react'
import {useRouter} from 'expo-router'

const SignIn = () => {
    const router = useRouter();
    return (
        <View>
            <Text>SignIn</Text>
            <Button title="Sign Up" onPress={() => router.push('/sign-up')}></Button>
        </View>
    )
}
export default SignIn
