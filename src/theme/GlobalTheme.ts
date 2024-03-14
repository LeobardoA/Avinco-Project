import { StyleSheet } from "react-native";

export const GlobalColors = {
    primary: '#3949AB',
    primaryLight: '#E8EAF6',
    primaryDarker: '#283593',
    secondary: '#1282a2',
    accent: '#fb8500',
    white: '#F1F1F1',
    whiteElement: '#FFFFFF',
    textColor: 'white',
    deleteButton: 'red'
}

export const globalStyle = StyleSheet.create({
    fondo: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    titleContainer: {
        width: "100%",
        height: "10%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#034078',
        borderBottomWidth: 1,
    },
    titleText: {
        color: '#fb8500',
        fontSize: 24,
        fontWeight: '900',
    },
    subTitleText: {
        fontSize: 12,
        marginHorizontal: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600'
    },
    content: {
        flex: 1,
    },
    footer: {
        bottom: 0,
        borderStartColor: 'black',
        borderTopWidth: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#034078',
        paddingVertical: 5
    },
    footerItem: {
        flex: 1,
        paddingTop: 10,
        borderColor: 'black',
        height: 55,
        borderEndWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerText: {
        color: '#FFF',
        fontSize: 16
    }
});