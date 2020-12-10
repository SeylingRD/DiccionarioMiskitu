import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const WordScreen = (props) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    firebase.db.collection("words").onSnapshot((querySnapshot) => {
      const words = [];
      querySnapshot.docs.forEach((doc) => {
        const { palabraEspañol, palabraMiskito, significado } = doc.data();
        words.push({
          id: doc.id,
          palabraEspañol,
          palabraMiskito,
          significado,
        })
      });
      setWords(words);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateWordScreen")}
        title="Ingresa una palabra"
      />
      {words.map((words) => {
        return (
          <ListItem
            key={words.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("WordDetailScreen", {
                wordsId: words.id
              })
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEUAAAD///9qamrZ2dne3t51dXXJycnLy8vT09PW1tbQ0NBycnJ3d3fU1NTGxsbBwcGenp6jo6P5+fnx8fEUFBS9vb3n5+dLS0umpqbr6+usrKyysrIpKSl9fX2UlJRGRkYbGxsiIiJfX186OjpBQUEwMDALCwuGhoY2NjZRUVHzti0tAAAE4UlEQVR4nO3c6VLjMBAEYJn7PhJu2CXc8P4vuFXUwrIhskaaltSdon8nGn/VikOwkzAse0LvA6ieH6F+foT6CSu18lLjcM/us48j1MtuBeFqxeMtSAXiWm/TXFbgQrIOK7RIJ4QT+YRoIqEQTGQUYomUQiiRU4gkkgqBRFYhjkgrhBF5hSgisRBE3O7NGAuESC2EELmFCCK5EEBkF/qJ9EI3kV/oJQoInUQFoY8oIXQR93sfvC3rSy90tNhGeO5fopi45Z9tyNGBf41SYhvh7+HQv0ghsZUQQSw73TQTdmuxnbBXiw2FnVpsKRwAZ9T8Fnf8Qw35K0QQs1tsK+xBbCwcNvyLZRJbC4dN/2p5xOZCBDHrdNNe2LrFDsLGLbYRHv0/tGmLXYSIqeYW+wgRY60tdhI2bLGXsB2xmxDxN7+J2E+IIO5xCxu12FPYpkXAm68hEWGTFvsKEZdNUi12FiKIiRZ7C+sTuwurE/sLEbdljREJhIhvRIycbhiECGK8RQph1RbbCI8TwpotkggRxFVuIYDILvQT6YVuIr9wOPMNERA6iQpCH1FC6CJ2FV5YhR6iiNBBVBGWE2WExcSIEHBd3ZAsYSlRSDhcFg1REpYRpYRFxK7Cq1xhCVFMWEBUE+YT5YTZRD3hMH3OGiIoHKZZQxiF00mKeJIxhFG4+pAQZrXIKFwL50mivUVOoYFoPt2QCoEtsgrDLYrYVXg9IoQRI0LAzfOGjArDY5I4swwhFoJaZBaG5PviZJYeQi1Mb9RJukVuoYF4lxpCLjQQZ4kh7ELDazHRYkQI+E6gIRahm8gv9BIFhOEp9XlxcjMyREEYXpPEkRYlhOHG0aKG0LBRoy2KCA0tPkWGqAjLN6qMsLjFiPC0JuwzpznCcFdGFBIaWnxd8CwlYZiliMPD9ydJCdMbdfjeopbQ0OLj/FPEhIYW5zeqmjC/RTlhmE3ziHrCXKKgMJwkibdfHq0oNLT4hSgpDM8ZRE1hzkaNCK9rwj5zWCwMIUn8+FFGWaG5RVmh4bX49v44XaGB+L5RhYXGFpWFhtPNm7rw+TJN1BYaWnzc7yk88AuTLU4iD5ARhpDcqPLCQqKSsIwoJSwiagnD2dILC4hthBswYT5RTphN1BPmEq/AlsWBCjOJisI8oqQwi6gpDGtLL8wgqgrtRFmhmagrtBKFhUaistBGlBaaiNrC2H8Qv+YCcPzpVBMaiG2Em5Hpv/xLb3MLWxA7CxsQewvrE7sLqxP7CxHEyEUZFiGCuBVf/di/uiHjQgRxh1tYlcghrEkkEVYksgjrEWmE1Yg8wmHPP2cRkUiIaHHBICZhHeKRf9GiuYsD2KjfRnEJES3O/z+BTIhoce6SOpsQ3yKdEN4inxDR4ldiG2H8s039FhmFiBb/3e9JKYQSOYWIjfpBJBUCiaxCHJFWiCCecgtRRGIhiMgsxBCphZDTTZvP+KVCBPE8/RBAioUIYpOUC1WIDqEI0SPUII5c3lsSok+oQHQKh/XegGS8Qn6iW0hP9AvZiQAh+elm7H4Xc6hbhAipW8QImVtM3gRqDG+LKCFvizAhLREnZCUChaREpJCTCBUOu705C4IVMrYIFhK2aPjyTl7oWoQL6VrEC9mIFYRViSu5uS/40ZV0XrKPw5pQ43Cp8iPUz49QP8sv/ANI+3X+Ty9sFQAAAABJRU5ErkJggg==4",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{words.palabraEspañol}</ListItem.Title>
              <ListItem.Subtitle>{words.palabraMiskito}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

export default WordScreen;
