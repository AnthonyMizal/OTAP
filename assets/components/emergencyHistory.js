import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const emergencyHistory = () => {
    return (
        <FlatList scrollEnabled={false} data={data} renderItem={({item}) => {
            if(input === "") {
               return ( 
                <TouchableOpacity style={styles.recipeCont} onPress={() => {navigation.navigate(ROUTES.EDITOWNRECIPE, item)}}>
                    <View style={styles.rightCont}>
                        <Image style={styles.recipeImg} source={{uri: imgUrl + item.img_location}} />
                    </View>
                    <View style={styles.middleCont}>
                        <Text style={styles.recipeTitle}>{item.name}</Text>
                        <Text style={styles.recipeCreator}>by {item.fullname}</Text>
                        <Text style={styles.recipeTD}>{item.cooking_time}MIN | {item.difficulty}</Text>
                    </View>
                    <View style={styles.leftCont}>
                        <DeleteButton data={item.id}/>
                    </View>
                </TouchableOpacity> )
            }
            if(item.name.toLowerCase().includes(input.toLowerCase())) {
                return ( 
                 <TouchableOpacity style={styles.recipeCont} onPress={() => {navigation.navigate(ROUTES.EDITOWNRECIPE, item)}}>
                     <View style={styles.rightCont}>
                         <Image style={styles.recipeImg} source={{uri: imgUrl + item.img_location}} />
                     </View>
                     <View style={styles.middleCont}>
                         <Text style={styles.recipeTitle}>{item.name}</Text>
                         <Text style={styles.recipeCreator}>by {item.fullname}</Text>
                         <Text style={styles.recipeTD}>{item.cooking_time}MIN | {item.difficulty}</Text>
                     </View>
                     <View style={styles.leftCont}>
                         <DeleteButton/>
                     </View>
                 </TouchableOpacity> )
             }
        
        }}/>
    );
}

export default emergencyHistory

const styles = StyleSheet.create({


})