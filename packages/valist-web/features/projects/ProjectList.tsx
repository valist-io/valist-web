import { useEffect, useState } from 'react';
import ProjectListCard from "./ProjectListCard";
import Link from "next/link";
import { Project } from '../../utils/Apollo/types';
import { Grid, Skeleton } from "@mantine/core";
import { selectAccount, selectPendingProjectID, setPendingProjectID } from './projectSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as appolloClient from '../../utils/Apollo/client';
import { gql } from '@apollo/client';

interface ProjectListProps {
  projects: Project[],
  linksDisabled: boolean,
}

export default function ProjectList(props: ProjectListProps) {

  const pendingProjectID = useAppSelector(selectPendingProjectID);
  const account = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
     const pendingProject =  appolloClient.default.readFragment({
        id: `Pending:1`,
        fragment: gql`
          fragment Pending on Pending {
            id
            name
          }
        `,
      });

      console.log(JSON.stringify(pendingProject.toJSON()));
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (pendingProjectID == props.projects[0].id) {
    dispatch(setPendingProjectID(null));
  }
  console.log(props.projects);



  return (
    <div>
      <Grid gutter="md">
        {pendingProjectID !== null && props.projects[0].account.name == account &&
          <Grid.Col style={{ marginTop: "1rem" }} xs={12} lg={6}>
            <Skeleton width="100%" height="100%" />
          </Grid.Col>
        }
        {props.projects?.map((project: Project) => (
          <Grid.Col style={{ marginTop: "1rem" }} xs={12} lg={6} key={project.id}>
            {props.linksDisabled ?
              <ProjectListCard
                teamName={project.account.name}
                projectName={project.name}
                metaURI={project.metaURI} />
              :
              <Link href={`/${project.account.name}/${project.name}`}>
                <a>
                  <ProjectListCard
                    teamName={project.account.name}
                    projectName={project.name}
                    metaURI={project.metaURI} />
                </a>
              </Link>
            }
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
