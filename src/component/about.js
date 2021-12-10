import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const about = () => {
    return (
        <View style={stylesAbout.container}>
            <View style={stylesAbout.row1}>
                <Text style={stylesAbout.title}>RnStudio</Text>
            </View>

            <View>
                <Text>
                    {'\n'}
                    {'\n'}
                    Cette application est une API recensant, des film avec différente
                    informations tels que :le titre, le résumé, la date de sortie, langue
                    d'origine, etc...
                    {'\n'}
                </Text>
                <View>
                    <Text style={stylesAbout.title}>Installation</Text>
                    <Text>
                        {'\n'}Installer React-Native voir le Guide d'installation
                        (https://reactnative.dev/docs/environment-setup) Installer yarn
                        "yarn install"{'\n'}
                    </Text>

                    <Text style={stylesAbout.title}>Utilisation</Text>
                    <Text>
                        {'\n'}
                        pour lancer l'application lancer le moteur avec la commande 'yarn
                        star' dans un 1er terminal puis l'emulateur ios ' yarn ios ' ou
                        android 'yarn android' dans un 2nd terminal
                        {'\n'}
                    </Text>
                </View>
                <View>
                    <Text style={{textAlignVertical: 'bottom', textAlign: 'center'}}>
                        {' '}
                        Fait par: Marika, Florent, Jonathan, Freddy{' '}
                    </Text>
                </View>
            </View>
        </View>
    );
};
const stylesAbout = StyleSheet.create({
    title: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        height: 50,
        backgroundColor: '#43CBFA',
    },
    container: {
        flexDirection: 'column',
        margin: 1,
        textAlign: 'center',
    },

    logo: {
        width: 50,
        height: 50,
    },
});

export default about;
