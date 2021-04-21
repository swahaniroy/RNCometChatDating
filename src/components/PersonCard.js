import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, withTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const PersonCard = ({ person, theme, decide }) => {
  const { colors, fonts } = theme;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={[{ fontSize: fonts.big }, styles.cardTitle]}>
          {person.name}
        </Title>
      </Card.Content>

      <Card.Cover
        source={{ uri: `https://robohash.org/${person.name}` }}
        style={styles.coverImage}
      />

      <Card.Actions style={styles.cardActions}>
        <View style={styles.iconContainer}>
          <Icon.Button
            name="close"
            backgroundColor={colors.danger}
            style={styles.iconButton}
            iconStyle={styles.icon}
            onPress={() => {
              decide(person, "dislike");
            }}
          />
          <Icon.Button
            name="check"
            backgroundColor={colors.success}
            style={styles.iconButton}
            iconStyle={styles.icon}
            onPress={() => {
              decide(person, "like");
            }}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: "100%",
  },
  cardTitle: {
    paddingBottom: 10,
  },
  coverImage: {
    flexGrow: 1,
  },
  cardActions: {
    position: "absolute",
    bottom: 5,
  },
  iconContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  iconButton: {
    padding: 23,
  },
  icon: {
    marginRight: 0,
    fontSize: 30,
  },
});

export default withTheme(PersonCard);
