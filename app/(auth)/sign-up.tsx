import {View, Text, Button} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const SignUp = () => {
    const router = useRouter();
    return (
        <View>
            <Text>Sign Up</Text>
            <Button title="Sign In" onPress={() => router.push('/sign-in')}></Button>
        </View>
    )
}
export default SignUp
