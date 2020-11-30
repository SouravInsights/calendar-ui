import React from "react";
import { format } from "date-fns";

import Calendar from "./Calendar";

export default {
  title: "Calendar",
  component: Calendar,
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.story = {
  date: format(new Date(), "yyyy-MM-dddd"),
};
