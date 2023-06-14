import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import user from '../../assets/data/user.json';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import {useForm, Controller, Control} from 'react-hook-form';
import {IUser} from '../../types/models';
import {useState} from 'react';
type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<IUser, IEditableUserField>;

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

interface ICostumInput {
  control: Control<IEditableUser, object>;
  name: IEditableUserField;
  label: string;
  multiline?: boolean;
  rules?: object;
}
const CostumInput = ({
  name,
  control,
  label,
  multiline = false,
  rules = {},
}: ICostumInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={{flex: 1}}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[
              styles.input,
              {borderColor: error ? colors.error : colors.border},
            ]}
            multiline={multiline}
            placeholder={label}
          />
          {error && (
            <Text style={{color: colors.error}}>
              {error.message || 'required'}
            </Text>
          )}
        </View>
      </View>
    )}
  />
);
const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user.website,
      bio: user.bio,
    },
  });

  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  const onSubmit = (data: IEditableUser) => {};
  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user.image}}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change profile photo
      </Text>
      <CostumInput
        name="name"
        control={control}
        rules={{required: true}}
        label="Name"
      />
      <CostumInput
        name="username"
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 3,
            message: 'Username should be more than 3 characters',
          },
        }}
        label="Username"
      />
      <CostumInput
        name="website"
        control={control}
        rules={{
          required: true,
          pattern: {value: URL_REGEX, message: 'Invalid url'},
        }}
        label="Website"
      />
      <CostumInput
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: 'Bio should be less than 200 characters',
          },
        }}
        label="Bio"
        multiline
      />
      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        Submit
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {width: '30%', aspectRatio: 1, borderRadius: 100},
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.m,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {width: 75},
  input: {borderBottomWidth: 1},
});

export default EditProfileScreen;
