import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const data = [
    { id: '0', stt: 1, title: 'Prisoner', view: 1.315519 },
    { id: '1', stt: 2, title: 'We Own The Night', view: 1.315519 },
    { id: '2', stt: 3, title: 'Head Hunter', view: 1.315519 },
    { id: '3', stt: 4, title: 'Son Of Robot', view: 1.315519 },
    { id: '4', stt: 5, title: 'Care', view: 1.315519 },
  ];
const ItemMusic = () => {
  return (
    <View>
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.containerFlat}>
              <Text style={styles.txtSTT}>{`${item.stt}`}</Text>
              <TouchableOpacity style={styles.btnItem}>
                <Text style={styles.txtTitle}>{item.title}</Text>
                <View style={styles.viewMusic}>
                  <Image source={require('../../assets/icons/Pages/icone.png')} />
                  <Text style={styles.txtView}>{item.view}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../assets/icons/Pages/other.png')} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  )
}

export default ItemMusic

const styles = StyleSheet.create({
    containerFlat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingTop: 24,
      },
      txtSTT: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFF',
        paddingRight: 8,
      },
      btnItem: { flex: 1 },
      txtTitle: { color: '#00CB51', fontSize: 14, fontWeight: '400', marginBottom: 1 },
      viewMusic: { flexDirection: 'row' },
      txtView: { color: '#A7A7A7', fontSize: 10, fontWeight: '400', marginLeft: 5.5 },
})