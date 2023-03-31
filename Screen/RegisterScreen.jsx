import react, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from 'react';

export default function LoginScreen({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
  ]);

  // state = {
  //   nik: '',
  //   nama: '',
  //   tgl_lahir: '',
  //   j_kel: '',
  //   no_hp: '',
  //   pekerjaan: '',
  //   alamat: '',
  //   email: '',
  //   password: '',
  // };
  const [nik, handleNik] = useState();
  const [nama, handleNama] = useState();
  const [tgl_lahir, handleTglLahir] = useState();
  const [j_kel, setJkel] = useState();
  const [no_hp, handleNohp] = useState();
  const [pekerjaan, handlePekerjaan] = useState();
  const [alamat, handleAlamat] = useState();
  const [email, handleEmail] = useState();
  const [password, handlePassword] = useState();
  // handleNik = text => {
  //   this.setState({nik: text});
  // };
  // handleNama = text => {
  //   this.setState({nama: text});
  // };
  // handleTglLahir = text => {
  //   this.setState({tgl_lahir: text});
  // };
  // // handleJkel = text => {
  // //   this.setState({j_kel: text});
  // // };
  // handleNohp = text => {
  //   this.setState({no_hp: text});
  // };
  // handlePekerjaan = text => {
  //   this.setState({pekerjaan: text});
  // };
  // handleAlamat = text => {
  //   this.setState({alamat: text});
  // };
  // handleEmail = text => {
  //   this.setState({email: text});
  // };
  // handlePassword = text => {
  //   this.setState({password: text});
  // };
  // login = (
  //   nik,
  //   nama,
  //   tgl_lahir,
  //   j_kel,
  //   no_hp,
  //   pekerjaan,
  //   alamat,
  //   email,
  //   password,
  // ) => {
  //   fetch('http://tgsrentalinmobil.cloud/api/register', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       nik: nik,
  //       nama: nama,
  //       tgl_lahir: tgl_lahir,
  //       j_kel: j_kel,
  //       no_hp: no_hp,
  //       pekerjaan: pekerjaan,
  //       alamat: alamat,
  //       email: email,
  //       password: password,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       if (response.success === false) {
  //         alert(response.message);
  //       } else if (response.success === true) {
  //         alert('Registrasi berhasil, silahkan login');
  //         Actions.login();
  //       } else {
  //         alert('Silahkan Periksa Kelngkapan Data');
  //         // login();
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Api call error');
  //       alert(error.message);
  //     });
  // };
  const saveData = async () => {
    // setLoading(true);
    await fetch('http://tgsrentalinmobil.cloud/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nik: nik,
        nama: nama,
        tgl_lahir: tgl_lahir,
        j_kel: j_kel,
        no_hp: no_hp,
        pekerjaan: pekerjaan,
        alamat: alamat,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          // ToastAndroid.show(json.messages, ToastAndroid.LONG);
          navigation.push('Login');
          handleNik('');
          handleNama('');
          handleTglLahir('');
          setJkel('');
          handleNohp('');
          handlePekerjaan('');
          handleAlamat('');
          handleEmail('');
          handlePassword('');
        }
        // } else {
        //   setErrorIdNumber(json.idnumber);
        //   setErrorFullname(json.fullname);
        //   setErrorGender(json.gender);
        //   setErrorAdress(json.address);
        //   setErrorPhone(json.phone);
        //   setErrorEmailaddress(json.emailaddress);
        // }
        console.log(json);
        // setLoading(false);
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.login}>Register</Text>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="NIK"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={nik}
        onChangeText={value => handleNik(value)}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Nama Lengkap"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={nama}
        onChangeText={value => handleNama(value)}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="2000-01-01"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={tgl_lahir}
        onChangeText={value => handleTglLahir(value)}
      />

      <DropDownPicker
        placeholder="Jenis Kelamin"
        placeholderTextColor="#808080"
        style={styles.dropdownpic}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={item => setJkel(item.value)}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="No HP"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={no_hp}
        onChangeText={value => handleNohp(value)}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Pekerjaan"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={pekerjaan}
        onChangeText={value => handlePekerjaan(value)}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Alamat"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={alamat}
        onChangeText={value => handleAlamat(value)}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={email}
        onChangeText={value => handleEmail(value)}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        value={password}
        onChangeText={value => handlePassword(value)}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={
          () => saveData()
          // this.login(
          //   this.state.nik,
          //   this.state.nama,
          //   this.state.tgl_lahir,
          //   this.state.j_kel,
          //   this.state.no_hp,
          //   this.state.pekerjaan,
          //   this.state.alamat,
          //   this.state.email,
          //   this.state.password,
          // )
        }>
        <Text style={styles.submitButtonText}> Daftar </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Sudah punya akun ? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    textAlign: 'center',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  input: {
    margin: 5,
    height: 40,
    width: 340,
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  dropdownpic: {
    margin: 5,
    height: 40,
    width: 340,
    marginBottom: 15,
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 28,
  },
});
