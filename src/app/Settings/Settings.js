import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {behaviourUpdateRules} from "../../redux/constants/settings";
import {setBehaviourUpdateRule} from "../../redux/actions";

export const Settings = () => {
    const dispatch = useDispatch();
    const { behaviourUpdateRule } = useSelector(state => state.settings);
    const onUpdateRuleChange = useCallback((event) => {
        dispatch(setBehaviourUpdateRule(event.target.value));
    }, [dispatch]);

    return (
        <Table variant="dark">
            <tbody>
            <tr>
                <td>Update rule for agent behaviour</td>
                <td>
                    <Form.Control as="select" defaultValue={behaviourUpdateRule} onChange={onUpdateRuleChange}>
                        <option value={behaviourUpdateRules.ALL}>Update all agents</option>
                        <option value={behaviourUpdateRules.ONLY_STATIONARY}>Update only stationary agents</option>
                        <option value={behaviourUpdateRules.NEVER}>Never update behaviour of agents</option>
                    </Form.Control>
                </td>
            </tr>
            </tbody>
        </Table>
    );
}