import React from "react";

import CalendarControls from "./CalendarControls";

export default {
  title: "CalendarControls",
  component: CalendarControls,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <CalendarControls {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Controls",
};
