import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type stackNavigation = StackNavigationProp<ParamListBase>;
type drawerNavigation = DrawerNavigationProp<ParamListBase>;

export type { stackNavigation, drawerNavigation };
