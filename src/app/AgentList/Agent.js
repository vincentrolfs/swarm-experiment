import React, {useCallback} from "react";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {setPartnerId} from "../../redux/actions";
import './Agent.css';

export const Agent = ({allAgents, agent}) => {
    const dispatch = useDispatch();
    const onSetPartnerId = useCallback(
        (event) => dispatch(setPartnerId(agent.id, event.target.value)),
        [dispatch, agent.id]
    );

    return (
        <tr key={agent.id}>
            <td>#{agent.id} <span className="colorIndictaor" style={{background: agent.color}}/> </td>
            <td>
                <Form.Control as="select" defaultValue={agent.partnerId || ""} onChange={onSetPartnerId}>
                    <option value={""} key={null} className="emptyOption">No partner</option>
                    {allAgents.map(foreignAgent => (foreignAgent.id === agent.id) ? null : (
                        <option value={foreignAgent.id} key={foreignAgent.id}>#{foreignAgent.id}</option>
                    ))}
                </Form.Control>
            </td>
            <td>{Math.abs(agent.behaviour).toFixed(2)}</td>
            <td>{Math.sign(agent.behaviour) === 1 ? "Get close" : "Stay away"}</td>
        </tr>
    );
};
