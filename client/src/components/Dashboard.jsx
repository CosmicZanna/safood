import React, { useEffect, useState } from 'react';
import EventsContainer from './EventsContainer';
import UsersContainer from './UsersContainer';
import RecipeContainer from './RecipeContainer';
import { getEvents, recipeRandom } from './service';
import { useAuth } from '../context/AuthContext';

import { getUser } from './service';
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Dashboard () {

  const { users, currentUser } = useAuth();

  async function fetchUser () {
    const res = await getUser(currentUser);
    return res.json();
  }

  async function getRandom () {
    const res = await recipeRandom(profile.allergens);
    return res.json();
  }

  async function fetchEvents () {
    const res = await getEvents();
    return res.json();
  }

  const { data: profile, status } = useQuery("user", fetchUser);
  const { data: events, status: eventStatus } = useQuery("events", fetchEvents);

  const { isIdle, isLoading, data: recipes } = useQuery(['random', profile], getRandom, {
    enabled: !!profile
  });

  const mockEvents = [{ name: 'dinner', time: 'tomorrow', guests: ['paul', 'mary'] }, { name: 'dinner', time: 'tomorrow', guests: ['paul', 'mary'] }];

  if (status === "loading" || eventStatus === "loading" || isIdle || isLoading) {
    return <div>loading</div>;
  }

  if (status === "error" || eventStatus === "error") {
    return <div>error</div>;
  }

  return (
    <>
      <RecipeContainer recipes={recipes}></RecipeContainer>
      <EventsContainer list={events.filter(event => event.members.includes(profile.name))}></EventsContainer>
      <UsersContainer users={users}></UsersContainer>
    </>
  );
}
