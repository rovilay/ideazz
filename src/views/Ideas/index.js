import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { View } from "react-native";
import { Input, Button, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import Text from "../../components/CustomText";
import generalStyles from "../../components/generalStyles";
import ideasScreenStyles from "./styles";
import { 
    confidenceRatingTitle, easeRatingTitle,
    impactRatingTitle, minimumRating, maximumRating
} from "../../helpers/defaults";
import { createIdea, updateIdea } from '../../redux/actionCreators/ideaActions';

const IdeasScreen = (props) => {
    const [ideaForm, setIdeaForm] = useState({
        title: {
            valid: false,
            value: '',
            errorMessage: ''
        },
        confidence: {
            valid: true,
            value: 1,
            errorMessage: ''
        },
        ease: {
            valid: true,
            value: 1,
            errorMessage: ''
        },
        impact: {
            valid: true,
            value: 1,
            errorMessage: ''
        },
    });

    const { 
        utils: { fontLoaded }, ideaOnEdit,
        createIdea, updateIdea, isLoading
    } = props;

    const handleFormChange = (value, field) => {
        const confirmField = {
            ...ideaForm[field],
            value,
            valid: !!value,
        };

        console.log(typeof value, '----');

        if (!confirmField.valid) {
            confirmField.errorMessage = `${field} is required`;
        } else {
            confirmField.errorMessage = ''
        }

        setIdeaForm({
            ...ideaForm,
            [field]: confirmField 
        });
    }

    const disableSubmit = () => {
        const { title, confidence, ease, impact } = ideaForm;
        const disable =  isLoading || !title.valid || !confidence.valid || !ease.valid || !impact.valid;

        return disable;
    }

    const handleFormSubmit = () => {
        const idea = {
            title: ideaForm.title.value,
            confidence: ideaForm.confidence.value,
            ease: ideaForm.ease.value,
            impact: ideaForm.impact.value,
        }

        console.log(idea, 'the idea------')
        createIdea(idea);
    }

    const renderRatingSlider = (rating) => {
        return (
            <View style={ideasScreenStyles.rating}>
                <View>
                    <Text fontLoaded={fontLoaded} customStyles={ideasScreenStyles.title}>
                        {rating}: {ideaForm[rating].value}
                    </Text>
                </View>
                <View style={{ 
                    flex: 1, alignItems: 'stretch', 
                        justifyContent: 'center', marginTop: 10,
                        padding: 10
                    }}
                >
                    <Slider
                        value={ideaForm[rating].value}
                        onValueChange={value => handleFormChange(
                            value, rating)}
                        step={1}
                        minimumValue={minimumRating}
                        maximumValue={maximumRating}
                        minimumTrackTintColor={generalStyles.defaultColor.color}
                        maximumTrackTintColor={generalStyles.disabledColor.color}
                        thumbTintColor={generalStyles.defaultColor.color}
                        trackStyle={{
                            shadowColor: "yellow"
                        }}
                    />
                </View>
            </View>
        );
    }

    const renderTitleInput = () => {
        return (
            <View>
                <Input
                    placeholder="title"
                    leftIcon={
                        <Icon
                            name="lightbulb-on"
                            size={24}
                            color={generalStyles.defaultColor.color}
                        />
                    }
                    inputContainerStyle={ideasScreenStyles.formInputContainer}
                    inputStyle={ideasScreenStyles.formInput}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={value => handleFormChange(
                        value, "title")}
                    selectionColor={generalStyles.defaultColor.color}
                    textContentType="name"
                    errorMessage={ideaForm.title.errorMessage}
                    errorStyle={ideasScreenStyles.error}
                    value={ideaForm.title.value}
                    autoCapitalize="none"
                    editable={!isLoading}
                />
            </View>
        );
    }

    const renderRatings = () => {
        return (
            <View style={ideasScreenStyles.ratings}>
                {renderRatingSlider(confidenceRatingTitle)}
                {renderRatingSlider(easeRatingTitle)}
                {renderRatingSlider(impactRatingTitle)}
            </View>
        );
    }

    const renderFormButton = () => {
        return (
            <Button
                title="create"
                containerStyle={ideasScreenStyles.formButtonContainer}
                buttonStyle={ideasScreenStyles.formButton}
                titleStyle={ideasScreenStyles.formButtonText}
                disabled={disableSubmit()}
                disabledStyle={{
                    backgroundColor: generalStyles.disabledColor.color
                }}
                disabledTitleStyle={{
                    color: generalStyles.whiteColor.color
                }}
                onPress={handleFormSubmit}
                loading={isLoading}
                loadingStyle={ideasScreenStyles.formButton}
            />
        );
    }
    const renderForm = () => {
        return (
            <View style={{ ...ideasScreenStyles.formContainer, marginTop: "10%" }}>
                {renderTitleInput()}
                {renderRatings()}
                {renderFormButton()}
            </View>
        );
    }

    return (
        <View style={ideasScreenStyles.container}> 
            {renderForm()}
        </View>
    );
}

IdeasScreen.propTypes = {
    utils: PropTypes.object.isRequired,
    ideaOnEdit: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createIdea: PropTypes.func.isRequired,
    updateIdea: PropTypes.func.isRequired,
};


export const mapStateToProps = ({ idea, utils }) => ({ 
    utils,
    ideaOnEdit: idea.ideaOnEdit,
    isLoading: idea.isLoading
});

const mapDispatchToProps = {
    createIdea,
    updateIdea
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeasScreen);