import Table from "react-bootstrap/Table";
import React from "react";
import {useSelector} from "react-redux";
import { sortBy } from "lodash/collection";

export const AgentList = () => {
    const agents = useAgentsArray();

    return (
        <Table variant="dark">
            <thead>
                <tr>
                    <th>Agent ID</th>
                    <th>Partner ID</th>
                    <th>Goal distance</th>
                    <th>Goal behaviour</th>
                </tr>
            </thead>
            <tbody>
                {agents.map(agent => (
                    <tr key={agent.id}>
                        <td>#{agent.id}</td>
                        <td>#{agent.partnerId}</td>
                        <td>{Math.abs(agent.behaviour).toFixed(2)}</td>
                        <td>{Math.sign(agent.behaviour) === 1 ? "Get close" : "Stay away"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const useAgentsArray = () => {
    const agents = useSelector(state => state.agents);

    return sortBy(Object.values(agents), 'id');
};