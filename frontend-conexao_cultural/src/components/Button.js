import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { THEME } from '../styles/colors';

// type pode ser 'primary' (amarelo), 'secondary' (borda apenas) ou 'success' (verde)
export default function Button({ title, type = 'primary', onPress, disabled = false }) {
    const pressAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (disabled) return;
        Animated.spring(pressAnim, {
            toValue: 0.97,
            friction: 8,
            tension: 120,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        if (disabled) return;
        Animated.spring(pressAnim, {
            toValue: 1,
            friction: 7,
            tension: 110,
            useNativeDriver: true,
        }).start();
    };

    const getButtonStyle = () => {
        if (type === 'success') return styles.successButton;
        if (type === 'secondary') return styles.secondaryButton;
        return styles.primaryButton;
    };

    const getTextStyle = () => {
        if (type === 'success') return styles.successText;
        if (type === 'secondary') return styles.secondaryText;
        return styles.primaryText;
    };

    return (
        <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
            <TouchableOpacity
                style={[
                    styles.button,
                    getButtonStyle(),
                    disabled && type !== 'success' && { opacity: 0.6 }
                ]}
                onPress={disabled ? undefined : onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={disabled ? 1 : 0.9}
                disabled={disabled}
            >
                <Text style={[styles.text, getTextStyle()]}>
                    {title}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButton: {
        backgroundColor: THEME.colors.primary, // Amarelo
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: THEME.colors.primary, // Borda Amarela
    },
    successButton: {
        backgroundColor: '#1B5E20', // Verde premium escuro/rico
        borderWidth: 1,
        borderColor: '#2E7D32',
    },
    text: {
        fontFamily: 'Cinzel_700Bold', // Fonte Mística
        fontSize: 16,
        textTransform: 'uppercase',
    },
    primaryText: {
        color: THEME.colors.textDark, // Texto preto no fundo amarelo
    },
    secondaryText: {
        color: THEME.colors.primary, // Texto amarelo no fundo transparente
    },
    successText: {
        color: '#E8F5E9', // Texto claro/esverdeado suave
    },
});