import React, { Fragment, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import { handleNavigation, getAuthPageAttributes } from "../../helpers/utils";
import Text from "../../components/CustomText";
import Layout from '../../components/Layout';
import authPagesStyles from "./styles";
import generalStyles from "../../components/generalStyles";
import { emailRegx, nameRegx, signupScreenName, loginScreenName } from "../../helpers/defaults";
import LinkText from '../../components/LinkText';

const AuthScreen = (props) => {
    const { utils: { fontLoaded }, navigation} = props;
    const { routeName } = navigation.state;
    const [formFields, setFormFields] = useState({
        name: {
            valid: '',
            value: '',
            errorMessage: ''
        },
        email: {
            valid: '',
            value: '',
            errorMessage: ''
        },
        password: {
            valid: '',
            value: '',
            errorMessage: ''
        },
        confirmPassword: {
            valid: '',
            value: '',
            errorMessage: ''
        }
    });

    const validateNameField = (value) => {
        const text = value.trimLeft();
        const nameField = {
            ...formFields.name,
            value: text
        };

        if (!text) {
            nameField.valid = false;
            nameField.errorMessage = 'name is required';
        } else if (!nameRegx.test(text)) {
            nameField.valid = false;
            nameField.errorMessage = "name can only contain letters and/or '-'";
        } else {
            nameField.valid = true;
            nameField.errorMessage = '';
        }

        setFormFields({
            ...formFields,
            name: nameField
        });
    };

    const validateEmailField = (value) => {
        const text = value.trim();
        const emailField = {
            ...formFields.email,
            value: text
        };

        if (!text) {
            emailField.valid = false;
            emailField.errorMessage = 'email is required';
        } else if (!emailRegx.test(text)) {
            emailField.valid = false;
            emailField.errorMessage = "email is invalid";
        } else {
            emailField.valid = true;
            emailField.errorMessage = '';
        }

        setFormFields({
            ...formFields,
            email: emailField
        });
    };

    const validatePasswordField = (value) => {
        const text = value;
        const passwordField = {
            ...formFields.password,
            value: text
        };

        if (routeName === signupScreenName) {
            const confirmPasswordField = {
                ...formFields.confirmPassword
            };
    
            if (!text) {
                passwordField.valid = false;
                passwordField.errorMessage = 'password is required';
                confirmPasswordField.valid = false;
                confirmPasswordField.errorMessage = 'password is required';
    
            } else if (text.length < 7 || 
                text !== formFields.confirmPassword.value
            ) {
                passwordField.valid = false;
                passwordField.errorMessage = "password is invalid";
                confirmPasswordField.valid = false;
                confirmPasswordField.errorMessage = "password is invalid";
    
            } else {
                passwordField.valid = true;
                passwordField.errorMessage = "";
                confirmPasswordField.valid = true;
                confirmPasswordField.errorMessage = "";
            }
    
            setFormFields({
                ...formFields,
                password: passwordField,
                confirmPassword: { 
                    ...formFields.confirmPassword, 
                    ...confirmPasswordField 
                },
            });
        } else {
            setFormFields({
                ...formFields,
                password: passwordField
            });
        }
    };

    const validateConfirmPasswordField = (value) => {
        const text = value;
        const confirmPasswordField = {
            ...formFields.confirmPassword,
            value: text
        };

        const passwordField = {
            ...formFields.password
        };

        if (!text) {
            confirmPasswordField.valid = false;
            confirmPasswordField.errorMessage = 'password is required';
            passwordField.valid = false;
            passwordField.errorMessage = 'password is required';
        } else if (text.length < 7 || 
            formFields.password.value !== text
        ) {
            confirmPasswordField.valid = false;
            confirmPasswordField.errorMessage = "password is invalid";
            passwordField.valid = false;
            passwordField.errorMessage = "password is invalid";
        } else {
            confirmPasswordField.valid = true;
            confirmPasswordField.errorMessage = '';
            passwordField.valid = true;
            passwordField.errorMessage = "";
        }

        setFormFields({
            ...formFields,
            password: { 
                ...formFields.password, 
                ...passwordField 
            },
            confirmPassword: confirmPasswordField
        });
    };

    const {
        pageTitle, otherAuth, promptMsg, currentAuth 
    } = getAuthPageAttributes(routeName);
    
    const handleLoginClick = () => {
        handleNavigation(props.navigation, otherAuth);
    };

    const disableSubmit = () => {
        let disable = !formFields.password.valid || !formFields.email.valid;
        if (!disable && routeName === signupScreenName) {
            disable = !formFields.confirmPassword.valid || !formFields.name.valid;
        }

        return disable;
    }

    const pagePostion = currentAuth === signupScreenName ? 'flex-start' : 'center';

    const renderForm = () => {
        return (
            <View style={authPagesStyles.formContainer}>
                <Text fontLoaded={fontLoaded} 
                    customStyles={authPagesStyles.title }
                >
                    {pageTitle}
                </Text>
                <View style={authPagesStyles.form}>
                    <Fragment>
                        {routeName === 'Signup' &&
                            <Input
                                placeholder='Full Name'
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color={generalStyles.defaultColor.color}
                                    />
                                }
                                inputContainerStyle={authPagesStyles.formInputContainer}
                                inputStyle={authPagesStyles.formInput}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                onChangeText={validateNameField}
                                selectionColor={generalStyles.defaultColor.color}
                                textContentType="name"
                                errorMessage={formFields.name.errorMessage}
                                errorStyle={authPagesStyles.error}
                                value={formFields.name.value}
                            />
                        }
                    </Fragment>
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={24}
                                color={generalStyles.defaultColor.color}
                            />
                        }
                        inputContainerStyle={{
                            borderColor: generalStyles.defaultColor.color,
                            borderWidth: 1,
                            width: '100%',
                            borderRadius: 4,
                            borderStyle: 'solid',
                            paddingTop: 14,
                            paddingRight: 5,
                            paddingBottom: 14,
                            paddingLeft: 5,
                            marginTop: 10
                        }}
                        inputStyle={{
                            fontFamily: 'vince',
                            fontSize: 24
                        }}
                        leftIconContainerStyle={{
                            marginRight: 10,
                        }}
                        onChangeText={validateEmailField}
                        selectionColor={generalStyles.defaultColor.color}
                        textContentType="emailAddress"
                        errorMessage={formFields.email.errorMessage}
                        errorStyle={authPagesStyles.error}
                        value={formFields.email.value}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={30}
                                color={generalStyles.defaultColor.color}
                            />
                        }
                        inputContainerStyle={authPagesStyles.formInputContainer}
                        inputStyle={authPagesStyles.formInput}
                        leftIconContainerStyle={{ marginRight: 15 }}
                        onChangeText={validatePasswordField}
                        secureTextEntry={true}
                        selectionColor={generalStyles.defaultColor.color}
                        textContentType="password"
                        errorMessage={formFields.password.errorMessage}
                        errorStyle={authPagesStyles.error}
                        value={formFields.password.value}
                    />
                    <Fragment>
                        {routeName === 'Signup' &&
                            <Input
                                placeholder='Confirm Password'
                                leftIcon={
                                    <Icon
                                        name='lock'
                                        size={30}
                                        color={generalStyles.defaultColor.color}
                                    />
                                }
                                inputContainerStyle={authPagesStyles.formInputContainer}
                                inputStyle={authPagesStyles.formInput}
                                leftIconContainerStyle={{ marginRight: 15 }}
                                onChangeText={validateConfirmPasswordField}
                                selectionColor={generalStyles.defaultColor.color}
                                textContentType="password"
                                secureTextEntry={true}
                                errorMessage={formFields.confirmPassword.errorMessage}
                                errorStyle={authPagesStyles.error}
                                value={formFields.confirmPassword.value}
                            />
                        }
                    </Fragment>
                </View>
                <Button
                    title="submit"
                    containerStyle={authPagesStyles.formButtonContainer}
                    buttonStyle={authPagesStyles.formButton}
                    titleStyle={authPagesStyles.formButtonText}
                    disabled={disableSubmit()}
                    disabledStyle={{
                        backgroundColor: generalStyles.disabledColor.color
                    }}
                    disabledTitleStyle={{
                        color: generalStyles.whiteColor.color
                    }}
                />
                <LinkText fontLoaded={fontLoaded}
                    customStyles={authPagesStyles.prompt}
                    onPress={handleLoginClick}
                >
                    {promptMsg}
                </LinkText>
            </View>
        );
    }

    return (
        <Layout>
            <View style={{
                ...authPagesStyles.container,
                justifyContent: pagePostion
            }}>
                {renderForm()}
            </View>
        </Layout>
    );
}

AuthScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    utils: PropTypes.object.isRequired
};

export const mapStateToProps = ({ utils }) => ({ utils });

export default connect(mapStateToProps, {})(AuthScreen);
