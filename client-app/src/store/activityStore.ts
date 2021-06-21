import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activityRegister = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
        // makeObservable(this, {
        //     title: observable
        // })
    }

    get getActivitiesByDate() {
        return Array.from(this.activityRegister.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    get groupedByDate() {
        return Object.entries(
            this.getActivitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            var activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    //Get activity from memory or from server.
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            //Get activity from server
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.selectedActivity = activity;
                this.loadingInitial = false;
                return activity;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }
    }

    //Get from memory
    private getActivity = (id: string) => {
        return this.activityRegister.get(id);
    }

    //Make the date format correct
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegister.set(activity.id, activity);
    }

    // selectActivity = (id: string) => {
    //     this.selectedActivity = this.activityRegister.get(id);
    // }

    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // openForm = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        // activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegister.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegister.set(activity.id, activity);
                this.loading = false;
                this.editMode = false;
                this.selectedActivity = activity;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.editMode = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegister.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}