import React, { Component } from 'react';
import {RefreshControl,View,ActivityIndicator,AppRegistry,ListView, Image,StyleSheet,Alert,AlertIOS,TouchableHighlight } from 'react-native';
import { List, ListItem,Container,Drawer , Header, Form,Item,Input,Label, Title,Thumbnail, Content, Badge, Footer,Card, CardItem, Fab,FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

export default class AnatomyExample extends Component {
 constructor(props) {
    super();
    this.state = {
      active: 'true',
      age : props.initialAge,
      text : '',
      username : '',
      password : '',
      basic: true,
      disabled : false,
      isLoading: true,
      dataSource : "",
    };
    this.UserName = "hello World"
     this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  _onRefresh() {
    // To-be-implemented
    this.componentDidMount()
  }

  EditRow(username){
     Alert.alert(
      'Edit Data',
      'Apakah Anda Yakin Edit Data '+username,
      [
        {text: 'Ask me later', onDismiss: () => {
            this.componentDidMount()
          }
        },
        {text: 'Cancel', onDismiss: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
              return fetch("http://192.168.1.12/workshop/login/getData/"+username)
                .then((response) => response.json())
                .then((responseJson) => {
                         
                  
                    this.setState({
                      isLoading: false,
                      disabled : true,
                      username : responseJson.Data[0].username,
                      password : responseJson.Data[0].password,
                    })
                    
                })              
                .catch((error) => {
                  console.error(error);
                });
          }
        },
      ],
      { cancelable: true }
    )
  }

  refresh(){
    this.setState({
      isLoading : true
    },function(){
      this.componentDidMount()  
    })
  }

  deleteRow(username) {
    Alert.alert(
      'Hapus Data',
      'Apakah Anda Yakin Hapus Data',
      [
        {text: 'Ask me later', onDismiss: () => {
            this.componentDidMount()
          }
        },
        {text: 'Cancel', onDismiss: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
              return fetch("http://192.168.1.12/workshop/login/DeleteData/"+username)
                .then((response) => response.json())
                .then((responseJson) => {
                  this.setState({
                    isLoading: true,
                  }, function() {
                    this.setState({
                      isLoading: false,
                    })
                    this.componentDidMount()
                  });
                })
                .catch((error) => {
                  console.error(error);
                });
          }
        },
      ],
      { cancelable: true }
    )
        
  }

  onClick(){
    this.setState({
        age : this.age + 3
    })
    
  }

  componentDidMount() {
    return fetch("http://192.168.1.12/workshop/login/getData")
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        //alert(ds.cloneWithRows(responseJson.Data))
        this.setState({
          isLoading: false,
          dataSource: responseJson.Data,
        }, function() {
          //
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onPressButtonRegister(){
       return fetch("http://192.168.1.12/workshop/login/register",
        {
        method : 'POST',
        headers  : {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
          body : 'username='+this.state.username+'&password='+this.state.password
       })
        .then((response) => response.json())
        .then((res) => {
          AlertIOS.alert(res.Pesan)
          this.setState({
            isLoading: true,
          }, function() {
            this.setState({
              isLoading: false,
            })
            this.componentDidMount()
          });
        })
        .catch((error) =>{
          console.log(error)
        });

  }
  _onPressButtonGET() {
    

      return fetch("http://192.168.1.12/workshop/login",
        {
        method : 'POST',
        headers  : {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
          body : 'username='+this.state.username+'&password='+this.state.password
       })
        .then((response) => response.json())
        .then((res) => {
          AlertIOS.alert(res.Pesan)
        })
        .catch((error) =>{
          console.log(error)
        });
           
    };

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    var data = {
      nama : "Asep Dadan",
      alamat : "garut",
      hobbies : ["futsal","coding","program"]
    };
    
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    
    navigationView = () => (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text></View>
    );

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 300}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      

      
      <Container>
        <Header>
          
          <Body>
            <Title>Weekend Motret</Title>
          </Body>
        </Header>
        <Content>
        
        
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: 'https://1.bp.blogspot.com/-nCk_KGTnsP4/WEerT7jQbSI/AAAAAAAAAMk/CrRgJQcJC2caU11Y_2ipdD37Dz8UqkcCgCEw/s1600/revy.jpg'}} />
                  <Body>
                    <Text>Weekend Motret</Text>
                    <Text note>Child</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri : 'data:image/jpeg;base64,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'}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text style={styles.red}>4 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>

             <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: 'https://1.bp.blogspot.com/-nCk_KGTnsP4/WEerT7jQbSI/AAAAAAAAAMk/CrRgJQcJC2caU11Y_2ipdD37Dz8UqkcCgCEw/s1600/revy.jpg'}} />
                  <Body>
                    <Text>Weekend Motret</Text>
                    <Text note>Child</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri : 'https://1.bp.blogspot.com/-nCk_KGTnsP4/WEerT7jQbSI/AAAAAAAAAMk/CrRgJQcJC2caU11Y_2ipdD37Dz8UqkcCgCEw/s1600/revy.jpg'}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text style={styles.red}>4 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>
    

  
            <Card>
              <CardItem>
                <Text>{data.nama}</Text>
              </CardItem>
              {data.hobbies.map((hobbi, i) => <CardItem key={i}><Text >{hobbi}</Text></CardItem>)}
              

              <CardItem>
                <Text>{this.state.age}</Text>
                <Perkenalan name='Rexxar' asal='Bandung'/>
                <Text>{this.state.text}</Text>
              </CardItem>

              <Button block primary onPress={() => this.onClick()}>
                <Text>Click</Text>
              </Button>

            </Card>
  
          <Form>
            <Item fixedLabel >
              <Label>Username</Label>
              <Input disabled={this.state.disabled} placeholder="Isikan Username" value={this.state.username} onChangeText={(setUsername) => {this.setState({username:setUsername})}}/>
            </Item>
            <Item fixedLabel last>
              <Label>Password</Label>
              <Input value={this.state.password} onChangeText={(setPassword) => {this.setState({password:setPassword})}} />
            </Item>
                <Button block success onPress={() => this._onPressButtonGET()} >
                    <Text>Login</Text>
                </Button>
                <Button block danger onPress={() => this._onPressButtonRegister()} >
                    <Text>Register</Text>
                </Button>
          </Form>
    

          

          <Card>
            <CardItem header>
              <Text>Card Base</Text>
            </CardItem>
            <CardItem>
              <Body>
                <CardItem>
                  <Icon active name="logo-instagram" />
                  <Text Style={{ Backgroundcolor: 'purple'}}>Instagram</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
                <CardItem>
                  <Icon active name="logo-facebook" />
                  <Text>Facebook</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>GeekyAnts</Text>
            </CardItem>
         </Card>
              

          <Card>
             <List    
                dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                renderRow={rowData =>
                  <ListItem>
                    <Text> {rowData.username} </Text>
                  </ListItem>}
                renderLeftHiddenRow={data =>
                  <Button full onPress={() => this.EditRow(data.username)}>
                    <Icon active name="information-circle" />
                  </Button>}
                renderRightHiddenRow={(data) =>
                  <Button full danger onPress={_ => this.deleteRow(data.username)}>
                    <Icon active name="trash" />
                  </Button>}
                leftOpenValue={75}
                rightOpenValue={-75}
              />
          </Card>


        </Content>

        

        <Footer>
          <FooterTab>
            <Button badge vertical>
              <Badge><Text>2</Text></Badge>
              <Icon active name="apps" />
            </Button>
            <Button>
              <Icon active name="camera" />
            </Button>
            <Button active badge vertical>
              <Badge ><Text>51</Text></Badge>
              <Icon active name="navigate" />
            </Button>
            <Button>
              <Icon active name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

class Perkenalan extends Component {
   render() {
     return (
       <Text>{this.props.name}{this.props.asal}</Text>
     );
   }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'blue',
    width : 100
  },
  button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    }
});


AnatomyExample.propTypes  = {
  
};


AppRegistry.registerComponent('propstate', () => AnatomyExample);