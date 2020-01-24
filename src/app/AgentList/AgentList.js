import Table from "react-bootstrap/Table";
import React from "react";
import {useSelector} from "react-redux";
import { sortBy } from "lodash/collection";
import {Agent} from "./Agent";

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
                    <Agent agent={agent} allAgents={agents} key={agent.id}/>
                ))}
            </tbody>
        </Table>
    );
};

const useAgentsArray = () => {
    const agents = useSelector(state => state.agents);

    return sortBy(Object.values(agents), 'id');
};