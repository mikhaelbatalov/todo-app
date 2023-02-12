import {
    StyleSheet,
    Text,
    View,
    Pressable
} from 'react-native';
import React, {useMemo} from 'react';
import CustomButton from './CustomButton';

export default function Item({
                                 selectedId,
                                 index,
                                 item,
                                 handleItemPress,
                                 handleEditPress
}) {

    const itemColor = useMemo(() => {
        switch (index) {
            case 0:
                return '#ac1447';
            case 1:
            case 2:
                return '#1d919c';
            case 3:
            case 4:
            case 5:
                return '#1374b5';
            default:
                return '#23292e';
        }
    }, [index]);
    const isSelected = useMemo(() => selectedId === item.id, [selectedId]);

    return (
        <Pressable style={[
            styles.container,
            {backgroundColor: itemColor},
            isSelected && styles.selectedContainer,
            item.isDone && styles.doneContainer
        ]}
                   onPress={handleItemPress}>
            <View style={styles.titleContainer}>
                <Text style={[
                    styles.title,
                    item.isDone && styles.doneTitle
                ]}>
                    {item.title}
                </Text>
                <CustomButton
                    iconName='note-edit-outline'
                    isInvertedColor={true}
                    onPress={handleEditPress}
                />
            </View>
            {(isSelected && item.description) && (
                <Text style={styles.description}>
                    {item.description}
                </Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        alignSelf: 'stretch',
        borderRadius: 10,
        backfaceVisibility: 'hidden'
    },
    selectedContainer: {
        marginTop: 20,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 10,
    },
    doneContainer: {
        opacity: 0.5
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    title: {
        alignSelf: 'center',
        color: 'white',
        flex: 1,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 20
    },
    doneTitle: {
        textDecorationLine: 'line-through'
    },
    description: {
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: 'white'
    }
});
