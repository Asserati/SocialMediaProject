import {View, Text, Image} from 'react-native';
import styles from './styles';
import user from '../../assets/data/user.json';
import Button from '../../components/Button/Button';

const ProfileHeader = () => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        {/* Profile image */}
        <Image source={{uri: ''}} style={styles.avatar} />
        {/* Posts, followers, following number  */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}></Text>
          <Text style={styles.labelText}>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}></Text>
          <Text style={styles.labelText}>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}></Text>
          <Text style={styles.labelText}>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>
      {/* Buttons */}
      <View style={{flexDirection: 'row'}}>
        <Button text="Edit Profile" onPress={() => {}} />
        <Button text="Edit Profile" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ProfileHeader;
