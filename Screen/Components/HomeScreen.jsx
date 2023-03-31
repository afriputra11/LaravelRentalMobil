import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import {Button, Text, Card, Icon, Header} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fectData = async () => {
      const token_key = await AsyncStorage.getItem('@tokenLogin');
      fetch('http://tgsrentalinmobil.cloud/api/mobil', {
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

        <Card>
          <Card.Title>Mobil Toyota</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{padding: 0}}
            source={{
              uri: 'https://img.cintamobil.com/2021/01/12/E7uYC7dI/mobil-toyota-bc15.png',
            }}
          />
          <Button
            onPress={() => navigation.navigate('Mobil')}
            icon={
              <Icon name="code" color="#ffffff" iconStyle={{marginRight: 10}} />
            }
            buttonStyle={{
              borderRadius: 0,
              backgroundColor: '#D10024',
              marginTop: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Lihat Detail"
          />
        </Card>
        <Card>
          <Card.Title>Mobil Daihatsu</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{padding: 0}}
            source={{
              uri: 'https://ad-cms-headless.imgix.net/assets/f18c9b98-89a7-4628-a5bf-ccecf0599f01?w=720&h=auto&q=65&fm=webp&auto=format&fit=max&crop=center',
            }}
          />
          <Button
            onPress={() => navigation.navigate('Mobil')}
            icon={
              <Icon name="code" color="#ffffff" iconStyle={{marginRight: 10}} />
            }
            buttonStyle={{
              borderRadius: 0,
              backgroundColor: '#D10024',
              marginTop: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Lihat Detail"
          />
        </Card>

        <Text style={styles.title}>Mobil Terbaru</Text>
        <View style={styles.grid}>
          {data &&
            data.map((item, i) => {
              return (
                <>
                  <View key={item.i} style={styles.items}>
                    <Card containerStyle={{}} wrapperStyle={{}}>
                      <Card.Title>
                        {item.merk_mobil} {item.nama_mobil}
                      </Card.Title>
                      <Card.Divider />
                      <View
                        style={{
                          position: 'relative',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: '100%', height: 100}}
                          resizeMode="contain"
                          //   source={{
                          //     uri: 'https://www.semisena.com/wp-content/uploads/2020/02/Toyota-Avanza-F.jpg',
                          //   }}

                          //   source={{
                          //     uri:
                          //       'http://192.168.5.43:8000/storage/img/mobil/' +
                          //       item.img_mobil,
                          //   }}
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
                        <Text style={styles.cardHarga}>
                          Rp. {item.harga_sewa} /Hari
                        </Text>
                        <Text style={styles.cardTahun}>
                          Tahun {item.th_mobil}
                        </Text>

                        {item.status == '1' ? (
                          <Text style={styles.tersedia}> Tersedia </Text>
                        ) : (
                          // `${require('./img/avatar.png')}`
                          <Text style={styles.tidaktersedia}>
                            {' '}
                            Tidak Tersedia{' '}
                          </Text>
                        )}

                        {item.status == '1' ? (
                          <Button
                            onPress={() =>
                              navigation.navigate('Detail', {data: item})
                            }
                            buttonStyle={{
                              borderRadius: 0,
                              backgroundColor: '#D10024',
                              fontSize: 10,
                              width: 150,
                              marginTop: 20,
                              marginLeft: 0,
                              marginRight: 0,
                              marginBottom: 0,
                            }}
                            title="Rental Sekarang"
                          />
                        ) : (
                          <Button
                            disabled
                            onPress={() =>
                              navigation.navigate('Detail', {data: item})
                            }
                            buttonStyle={{
                              borderRadius: 0,
                              backgroundColor: '#D10024',
                              fontSize: 10,
                              width: 150,
                              marginTop: 20,
                              marginLeft: 0,
                              marginRight: 0,
                              marginBottom: 0,
                            }}
                            title="Rental Sekarang"
                          />
                        )}
                      </View>
                    </Card>
                  </View>
                </>
              );
            })}
        </View>
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
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  items: {
    width: '50%', // is 50% of container width
  },
  cardMobil: {
    flex: 2,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMerk: {
    paddingTop: 10,
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cardHarga: {
    paddingTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#D10024',
    fontWeight: 'bold',
  },
  cardTahun: {
    paddingTop: 5,
    fontSize: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tidaktersedia: {
    backgroundColor: '#D10024',
    paddingTop: 0,
    fontSize: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  tersedia: {
    backgroundColor: '#008000',
    paddingTop: 0,
    fontSize: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
