import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Header, Text, ListItem, Avatar, Icon, Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fectData = async () => {
      const token_key = await AsyncStorage.getItem('@tokenLogin');
      fetch('http://tgsrentalinmobil.cloud/api/rental/get-data', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token_key,
        },
      })
        .then(res => res.json())
        .then(response => {
          setData(response.data);
        });
    };

    // call the function
    fectData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  const BASE_URI = 'http://tgsrentalinmobil.cloud/storage/img/mobil/';
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header style={{backgroundColor: 'red'}}>
          <Icon
            reverse
            name="car"
            type="ionicon"
            color="#00aced"
            onPress={() => navigation.navigate('Mobil')}
          />
          <Icon
            reverse
            name="cart"
            type="ionicon"
            color="#00aced"
            onPress={() => navigation.navigate('ListRental')}
          />
          <Button
            onPress={() => navigation.navigate('Login')}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: 'black',
              marginTop: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Logout"
          />
        </Header>
        <Text style={styles.title}>Data Rental Saya</Text>

        {data &&
          data.map((item, i) => {
            return (
              <>
                <ListItem
                  key={i}
                  containerStyle={{}}
                  disabledStyle={{opacity: 0.5}}
                  onLongPress={() => console.log('onLongPress()')}
                  onPress={() => console.log('onLongPress()')}
                  pad={20}>
                  <Avatar
                    style={{width: 80, marginLeft: 20}}
                    source={
                      item.img_mobil == ''
                        ? {
                            uri: 'https://www.semisena.com/wp-content/uploads/2020/02/Toyota-Avanza-F.jpg',
                          }
                        : // `${require('./img/avatar.png')}`
                          {
                            uri:
                              'http://tgsrentalinmobil.cloud/storage/img/mobil/' +
                              item.img_mobil,
                          }
                    }
                  />
                  <ListItem.Content style={{marginLeft: 20}}>
                    <ListItem.Title>
                      <Text style={{fontWeight: 'bold'}}>
                        {item.merk_mobil} {item.nama_mobil}
                      </Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <Text>Tgl Rental: {item.tgl_rental}</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      <Text>Tgl Kembali: {item.tgl_kembali}</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      <Text>Harga Sewa : Rp. {item.harga_sewa}/Hari</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      <Text>Lama Rental : {item.lama_sewa} Hari</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      <Text style={{color: '#D10024', fontWeight: 700}}>
                        Total Biaya : {item.total_biaya}
                      </Text>
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#D10024',
  },
});
