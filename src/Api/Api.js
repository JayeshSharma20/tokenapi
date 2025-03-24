import { useSelector } from "react-redux";
import { getTestingOffice, userRolesList, userGroupList,countryList } from "./UserApi";

const token = localStorage.getItem('token')
// console.log(token)

export async function getTestingOfficeOptions() {
    try {
        const data = await getTestingOffice(
            token,
            `?$select=TestingOfficeName,Id,isActive`
        );
        const testing = data?.value?.map((x) => ({
            value: x.Id,
            label: x.TestingOfficeName,
        }));
        // console.log(testing);
        return testing;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getRoleOptions(){
    try {
        const data = await userRolesList(
            token,
        );
        const role = data?.value?.map((x) => ({
            value: x.Id,
            label: x.RoleName,
        }));
        // console.log(role);
        return role;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getUserGroup(){
    try {
        const data = await userGroupList(
            token,
        );
        let group = data.map((x)=>({
            label : x.key
          }))
        // console.log(group);
        return group;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getCountry(){
    try {
        const data = await countryList(
            token,
             "?$count=true"
        );
        let country =
        data?.value &&
        data.value?.length > 0 &&
        data.value?.map((x) => ({
          value: x.Id,
          label: x.CountryName,
          CountryCode: x.CountryCode,
          IsDefault: x.IsDefault,
          }))
        // console.log(country);
        return country;
    } catch (error) {
        console.error(error);
        return [];
    }
    
}