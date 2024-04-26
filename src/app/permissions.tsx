// BASIC COMPONENT FOR TESTING VISIBILITY OF COMPONENTS BASED ON PERMISSIONS
// needs polishing

import { useBoundedState } from "@/store/boundedStore";
import { PermissionsEnum } from "@/types/Permissions";
import { BoundedState } from "@/types/StoreTypes";
import { useEffect, useState } from "react";

const Permissions = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isCreateChecked, setIsCreateChecked] = useState<boolean>(false);
    const [isReadChecked, setIsReadChecked] = useState<boolean>(false);
    const [isUpdateChecked, setIsUpdateChecked] = useState<boolean>(false);
    const [isDeleteChecked, setIsDeleteChecked] = useState<boolean>(false);

    const permissions = useBoundedState((state: BoundedState) => state.permissions);
    const setPermissions = useBoundedState((state: BoundedState) => state.setPermissions);

    useEffect(() => {
        if (permissions) {
            setIsCreateChecked(permissions.includes(PermissionsEnum.CREATE));
            setIsReadChecked(permissions.includes(PermissionsEnum.READ));
            setIsUpdateChecked(permissions.includes(PermissionsEnum.UPDATE));
            setIsDeleteChecked(permissions.includes(PermissionsEnum.DELETE));
        }
    }, [permissions]);

    useEffect(() => {
        let perm = [];
        isCreateChecked && perm.push('CREATE');
        isReadChecked && perm.push('READ');
        isUpdateChecked && perm.push('UPDATE');
        isDeleteChecked && perm.push('DELETE');
        setPermissions(perm)
    }, [isCreateChecked, 
        isReadChecked, 
        isUpdateChecked, 
        isDeleteChecked])

    return (
        <div className="absolute top-0 left-0 p-4">
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={() => {console.log(isChecked); setIsChecked(!isChecked)}} />
                <div className="relative w-11 h-6 bg-teal-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-400 dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-800"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Change Permissions</span>
            </label>

            {isChecked && (
                <div className="flex flex-col items-start space-y-4 p-4 bg-teal-800 rounded-lg mt-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600 bg-gray-700" name="permissions" value="create" checked={isCreateChecked} onChange={() => setIsCreateChecked(!isCreateChecked)}/>
                  <span>{PermissionsEnum.CREATE}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" name="permissions" value="read" checked={isReadChecked} onChange={() => setIsReadChecked(!isReadChecked)}/>
                  <span>{PermissionsEnum.READ}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" name="permissions" value="update" checked={isUpdateChecked} onChange={() => setIsUpdateChecked(!isUpdateChecked)}/>
                  <span>{PermissionsEnum.UPDATE}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" name="permissions" value="delete" checked={isDeleteChecked} onChange={() => setIsDeleteChecked(!isDeleteChecked)}/>
                  <span>{PermissionsEnum.DELETE}</span>
                </label>
              </div>
              
            )}
        </div>
    )
}

export default Permissions;