import { MenuItemType } from "../../../utils/Types";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import HttpsIcon from '@mui/icons-material/Https';
import ReceiptIcon from '@mui/icons-material/Receipt';


export const Menu: MenuItemType[] = [
    {
        icon: <DensityMediumIcon color="secondary" />,
        title: "Manage data services",
        items: [
            {
                title: "Sizes",
                to: "/sizes"
            },
            {
                title: "Materials",
                to: "/materials"
            },
            {
                title: "Photo books",
                to: "/photoBooks"
            }
        ]
    },
    {
        icon: <HttpsIcon color="secondary" />,
        title: "Security",
        items: [
            {
                title: "Users",
                to: "/users"
            },
            {
                title: "Permissions",
                to: "/permissions"
            },
            {
                title: "Configuration",
                to: "/configuration"
            }
        ]
    }
    ,
    {
        icon: <ReceiptIcon color="secondary" />,
        title: "Manage Invoicing",
        items: [
            {
                title: "Invoice",
                to: "/invoice"
            },
            {
                title: "Clients",
                to: "/clients"
            }
        ]
    }
]