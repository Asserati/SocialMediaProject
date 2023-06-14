import {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IComment} from '../../types/models';

interface ICommentProps {
  comment: IComment;
  includeDetails: boolean;
}
const Comment = ({comment, includeDetails = false}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(v => !v);
  };
  return (
    <View style={styles.comment}>
      {includeDetails && (
        <Image source={{uri: comment.user.image}} style={styles.avatar} />
      )}
      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.user.username}</Text>{' '}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>Re</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={16}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  bold: {fontWeight: fonts.weight.bold},
  comment: {flexDirection: 'row', alignItems: 'center'},
  commentText: {color: colors.black},
  icon: {marginHorizontal: 5},
  avatar: {width: 40, aspectRatio: 1, borderRadius: 25, marginRight: 5},
  footer: {flexDirection: 'row', marginBottom: 10},
  footerText: {marginRight: 10},
  middleColumn: {flex: 1},
});
export default Comment;
