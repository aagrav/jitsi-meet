/* @flow */

import React, { Component } from 'react';
import {
    Text,
    View } from 'react-native';
import { connect } from 'react-redux';

import styles, { ANDROID_UNDERLINE_COLOR } from './styles';

import { translate } from '../../base/i18n';

/**
* The type of the React {@code Component} props of {@link FormRow}
*/
type Props = {

    /**
    */
    children: Object,

    /**
    * Prop to decide if a row separator is to be rendered.
    */
    fieldSeparator: boolean,

    /**
    * The i18n key of the text label of the form field.
    */
    i18nLabel: string,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
}

/**
 * Implements a React {@code Component} which renders a standardized row
 * on a form. The component should have exactly one child component.
 */
class FormRow extends Component<Props> {

    /**
     * Initializes a new {@code FormRow} instance.
     *
     * @param {Object} props - Component properties.
     */
    constructor(props) {
        super(props);

        React.Children.only(this.props.children);
        this._getDefaultFieldProps = this._getDefaultFieldProps.bind(this);
        this._getRowStyle = this._getRowStyle.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @override
     * @returns {ReactElement}
     */
    render() {
        const { t } = this.props;

        // Some field types need additional props to look good and standardized
        // on a form.
        const newChild = React.cloneElement(
            this.props.children,
            this._getDefaultFieldProps(this.props.children)
        );

        return (
            <View
                style = { this._getRowStyle() } >
                <View style = { styles.fieldLabelContainer } >
                    <Text style = { styles.text } >
                        { t(this.props.i18nLabel) }
                    </Text>
                </View>
                <View style = { styles.fieldValueContainer } >
                    { newChild }
                </View>
            </View>
        );
    }

    _getDefaultFieldProps: (field: Component<*, *>) => Object;

    /**
    * Assembles the default props to the field child component of
    * this form row.
    *
    * Currently tested/supported field types:
    *       - TextInput
    *       - Switch (needs no addition props ATM).
    *
    * @private
    * @param {Object} field - The field (child) component.
    * @returns {Object}
    */
    _getDefaultFieldProps(field: Object) {
        if (field && field.type) {
            switch (field.type.displayName) {
            case 'TextInput':
                return {
                    style: styles.textInputField,
                    underlineColorAndroid: ANDROID_UNDERLINE_COLOR
                };
            }
        }

        return {};
    }

    _getRowStyle: () => Array<Object>;

    /**
    * Assembles the row style array based on the row's props.
    *
    * @private
    * @returns {Array<Object>}
    */
    _getRowStyle() {
        const rowStyle = [
            styles.fieldContainer
        ];

        if (this.props.fieldSeparator) {
            rowStyle.push(styles.fieldSeparator);
        }

        return rowStyle;
    }
}

export default translate(connect()(FormRow));