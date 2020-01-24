import Table from "react-bootstrap/Table";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import { sortBy } from "lodash/collection";
import {Agent} from "./Agent";
import Button from "react-bootstrap/Button";
import Octicon, {Plus} from "@primer/octicons-react";
import "./AgentList.css";
import {addAgent} from "../../redux/actions";

export const AgentList = () => {
    const agents = useAgentsArray();
    const dispatch = useDispatch();
    const onAddAgent = useCallback((event) => dispatch(addAgent()), [dispatch]);

    return (
        <Table variant="dark">
            <thead>
                <tr>
                    <th>Agent ID</th>
                    <th>Partner ID</th>
                    <th>Goal distance</th>
                    <th>Goal behaviour</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {agents.map(agent => (
                    <Agent agent={agent} allAgents={agents} key={agent.id}/>
                ))}
                <tr><td colSpan={5} className="buttonCell">
                    <Button variant="light" onClick={onAddAgent}>
                        <Octicon icon={Plus} className="icon"/> Add agent
                    </Button>
                </td></tr>
            </tbody>
        </Table>
    );
};

const useAgentsArray = () => {
    const agents = useSelector(state => state.agents);

    return sortBy(Object.values(agents), (agent) => parseInt(agent.id));
};