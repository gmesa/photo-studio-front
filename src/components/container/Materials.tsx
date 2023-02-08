import { Add, Delete, Edit } from '@mui/icons-material';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { addMaterial, deleteMaterial, getMaterials, updateMaterial } from '../../services/ApiConfig';
import { Material } from '../../shared/Models';
import { CrudActions } from '../../utils/Enums';
import { InfoData } from '../../utils/Types';
import BasicSnackBar from '../presentational/BasicSnackBar';
import { Loading } from '../presentational/Loading';

interface MaterialProps {

}

interface MaterialAction {
    material: Material, action: CrudActions
}

const Materials: React.FC<MaterialProps> = (props: MaterialProps) => {

    const [materials, setMaterials] = useState<Material[]>([]);
    const [error, setError] = useState<InfoData>({ show: false, msg: '', severity: 'error' })
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedMaterial, setSelectedMaterial] = useState<MaterialAction>();
    const theme = useTheme();

    const tableStyles = {
        tab: {
            border: '1px solid ' + theme.palette.primary.main,
            width: '385px',
        },
        tabCell: {
            padding: '5px',
            'span': {
                fontSize: '14px !Important',
            }
        },
        th: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            padding: '15px 10px',
            textAlign: 'left',
            fontSize: '16px',
        },
        button: {
            margin: '0 4px',
            minWidth: '40px !Important',
            '.MuiButton-startIcon': {
                margin: '0 !Important',
            }
        },
        dialogCont: {
            padding: '10px',
            '.MuiPaper-root': {

            }
            ,
            'h2.MuiTypography-root': {
                padding: '10px',
                background: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                textAlign: 'center',
            },
            '.MuiAlert-icon': {
                marginRight: '3px',
            }

        },
        dialBody: {
            padding: '0 20px'
        },
        actions: {
            justifyContent: 'space-between',
            padding: '5px 20px 10px',
        }
    }

    useEffect(() => {

        setTimeout(() => {
            (async () => {
                await getMaterials().then(response => {
                    setMaterials(response.data);
                }).catch((ex) => {
                    setError((error) => {
                        return {
                            ...error,
                            show: true,
                            msg: 'Error getting materials',
                        }
                    })

                }).finally(() => {
                    setLoading(false);
                })
            }
            )()
        }, 1000);



    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMaterial((bef: MaterialAction | undefined) => {
            const a: MaterialAction = {
                ...bef!,
                material: {
                    ...bef!.material,
                    materialName: event.target.value
                }
            };

            return a;
        })
    };

    const materialName = () => {
        return (
            <TextField
                type='text'
                value={selectedMaterial!.material.materialName}
                onChange={handleChange}
                margin='normal'
                size='small'
                variant='outlined'
                inputProps={{ maxLength: 100 }}
            />
        );
    }

    const editMaterial = (material: Material) => {
        setSelectedMaterial({
            material: material,
            action: CrudActions.Update
        });
        setOpenDialog(true);
    }

    const removeMaterial = (material: Material) => {
        setSelectedMaterial({
            material: material,
            action: CrudActions.Delete,
        });
        setOpenDialog(true);

    }

    const addMaterials = () => {
        setSelectedMaterial({
            material: { materialName: '' },
            action: CrudActions.Add,
        });
        setOpenDialog(true);
    }

    const closeDialog = () => {

        setOpenDialog(false);
    }

    const updateMaterials = (materialAction: MaterialAction = selectedMaterial!) => {
        const { material, action } = materialAction;

        const id = material.id;

        const body = {
            "materialName": material.materialName
        }

        let addedMaterial: Material;

        switch (action) {
            case CrudActions.Add:
                setLoading(true);
                setTimeout(() => {
                    (async () => {
                        addMaterial(body).then(response => {
                            const respObj = response.data;
                            addedMaterial = {
                                id: respObj.id,
                                materialName: respObj.materialName
                            };
                            const materialsUpdated = [...materials, addedMaterial];
                            setMaterials(materialsUpdated);
                            setLoading(false);

                        }, error => {
                            setError({ show: true, msg: 'Error adding material' });
                            setLoading(false);
                        });
                    })()
                }, 1000);
                break;
            case CrudActions.Delete:
                setLoading(true);
                setTimeout(() => {
                    (async () => {
                        deleteMaterial(id!).then(response => {
                            setMaterials(materials.filter((row) => row.id !== id));
                            setLoading(false);
                        }, error => {
                            setError({ show: true, msg: 'Error adding material data' });
                            setLoading(false);
                        });
                    })()
                }, 1000);

                break;
            case CrudActions.Update:
                setLoading(true);
                setTimeout(() => {
                    (async () => {
                        updateMaterial(id!, body).then(response => {
                            const respObj = response.data;
                            addedMaterial = {
                                id: respObj.id,
                                materialName: respObj.materialName
                            };
                            setMaterials(materials.map((row) => (row.id === id ? addedMaterial : row)));
                            setLoading(false);
                        }, error => {
                            setError({ show: true, msg: 'Error updating size data' });
                            setLoading(false);
                        });
                    })()
                }, 1000);

                break;
            default:
                break

        }
    }

    const handleClose = () => {
        setError({ show: false, msg: '' })
    }

    const getButtonText = (): string => {
        let text = '';
        switch (selectedMaterial?.action) {
            case CrudActions.Delete:
                text = 'Delete';
                break;
            case CrudActions.Add:
                text = 'Add';
                break;
            case CrudActions.Update:
                text = 'Update';
                break;
            default:
                break;

        }
        return text;
    }


    return (
        <>
            {loading ? <Loading /> :
                <Container className='container' sx={{ width: 'max-content', marginTop: theme => theme.spacing(2) }}>
                    <Typography component="h2" variant='h6' sx={{ margin: 1, textAlign: 'center', marginBottom: 2 }}>Manage materials</Typography>
                    <Table stickyHeader={true} sx={tableStyles.tab}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} align='left'>
                                    <Button variant='contained' startIcon={<Add />} onClick={() => addMaterials()}>Add</Button>
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} align='left' sx={[tableStyles.tabCell, tableStyles.th]}>Materials</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {materials.map((material, key) => (
                                <TableRow key={key}>
                                    <TableCell align='left' sx={tableStyles.tabCell}>
                                        <Typography component='span'>{material.materialName}</Typography>

                                    </TableCell>
                                    <TableCell align='right' sx={tableStyles.tabCell}>
                                        <Button
                                            sx={tableStyles.button}
                                            variant='contained'
                                            onClick={() => editMaterial(material)}
                                            size='small'
                                            startIcon={<Edit />}></Button>
                                        <Button
                                            sx={tableStyles.button}
                                            variant='contained'
                                            size='small'
                                            onClick={() => removeMaterial(material)}
                                            startIcon={<Delete />}></Button>

                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                    <Dialog open={openDialog} sx={tableStyles.dialogCont}>
                        <DialogTitle variant='h6'>Edit material</DialogTitle>
                        <DialogContent sx={tableStyles.dialBody}>
                            {selectedMaterial && (selectedMaterial.action === CrudActions.Update || selectedMaterial.action === CrudActions.Add) && materialName()}
                            {selectedMaterial && selectedMaterial.action === CrudActions.Delete &&
                                <Alert
                                    severity='error'
                                    sx={{ background: 'none', color: theme.palette.error.main, margin: '5px 0' }}>
                                    Are you sure do you want to delete this material ?.
                                </Alert>}
                        </DialogContent>
                        <DialogActions sx={tableStyles.actions}>
                            <Button variant='contained' onClick={closeDialog}>Cancel</Button>
                            <Button variant='contained' onClick={() => { closeDialog(); updateMaterials() }}>{getButtonText()}</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            }
            <BasicSnackBar open={error.show} handleClose={handleClose} message={error.msg!} />
        </>
    )
}

export { Materials }