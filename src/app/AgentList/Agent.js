import React, {useCallback} from "react";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {removeAgent, setAgentBehaviour, setPartnerId} from "../../redux/actions";
import './Agent.css';
import Button from "react-bootstrap/Button";
import Octicon, {Trashcan} from "@primer/octicons-react";

export const Agent = ({allAgents, agent}) => {
    const dispatch = useDispatch();
    const onSetpartner_id = useCallback(
        (event) => dispatch(setPartnerId(
            agent.id,
            event.target.value
        )),
        [dispatch, agent.id]
    );
    const onSetBehaviourSign = useCallback(
        (event) => dispatch(setAgentBehaviour(
            agent.id,
            Math.abs(agent.behaviour) * event.target.value
        )),
        [dispatch, agent.id, agent.behaviour]
    );
    const onSetBehaviourMagnitude = useCallback(
        (event) => {
            const inputInt = parseFloat(event.target.value)

            if (isNaN(inputInt) || inputInt <= 0) {
                return;
            }

            dispatch(setAgentBehaviour(
                agent.id,
                Math.sign(agent.behaviour) * inputInt
            ));
        },
        [dispatch, agent.id, agent.behaviour]
    );
    const onRemoveAgent = useCallback((event) => dispatch(removeAgent(agent.id)), [dispatch, agent.id]);

    return (
        <tr key={agent.id}>
            <td>#{agent.id} <span className="colorIndictaor" style={{background: agent.color}}/></td>
            <td>
                <Form.Control as="select" defaultValue={agent.partner_id || ""} onChange={onSetpartner_id}>
                    <option value={""} key={null} className="emptyOption">No partner</option>
                    {allAgents.map(foreignAgent => (foreignAgent.id === agent.id) ? null : (
                        <option value={foreignAgent.id} key={foreignAgent.id}>#{foreignAgent.id}</option>
                    ))}
                </Form.Control>
            </td>
            <td>
                <Form.Control value={Math.abs(agent.behaviour)} onChange={onSetBehaviourMagnitude}/>
            </td>
            <td>
                <Form.Control as="select" value={Math.sign(agent.behaviour)} onChange={onSetBehaviourSign}>
                    <option value={1}>Get close</option>
                    <option value={-1}>Stay away</option>
                </Form.Control>
            </td>
            <td>
                <Button variant="light" onClick={onRemoveAgent}>
                    <Octicon icon={Trashcan} className="icon"/>
                </Button>
            </td>
        </tr>
    );
};
