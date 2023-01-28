import { Add, Cancel, Delete, Edit, Save } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Container } from '@mui/system'
import {
    DataGrid, GridColumns, GridActionsCellItem, GridRowId, GridRowModel,
    GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridToolbarContainer,
    MuiEvent, GridEventListener
} from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Size } from '../../shared/Models'
import { generateKeyId } from '../../utils/Utils'
import { CrudActions } from '../../utils/Enums'
import { addSize, deleteSizes as deleteSize, getSizes, updateSize } from '../../services/ApiConfig'
import BasicSnackBar from '../presentational/BasicSnackBar'


interface SizeProps { }

interface RowSize extends Size {
    isNew?: boolean
}

interface EditToolBarProps {
    setSizes: (newRows: (oldRowsProp: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (newModel: ((oldModel: GridRowModesModel) => GridRowModesModel)) => void;
}

const Sizes: React.FC<SizeProps> = (props: SizeProps) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [sizes, setSizes] = useState<RowSize[]>([]);
    const [error, setError] = useState<{ err: boolean, msg: string }>({ err: false, msg: '' });

    const columns: GridColumns = [
        {
            field: "size", headerName: "Size", minWidth: 150, editable: true
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            //width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {

                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<Save />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<Cancel />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<Delete />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    useEffect(() => {

        setTimeout(() => {
            (async () => {
                await getSizes().then(response => {
                    const sizes = response.data;
                    setSizes(sizes);
                    setLoading(false);
                });

            })();
        }, 1000);
    }, []);

    const EditToolbar: React.FC<EditToolBarProps> = (props: EditToolBarProps) => {

        const { setSizes, setRowModesModel } = props;

        const id = generateKeyId(1, 500000);

        const handleClick = () => {

            setSizes((oldRows) => [...oldRows, { id, Size: '', isNew: true }])
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'size' },
            }))
        }

        return (
            <GridToolbarContainer>
                <Button color='primary' startIcon={<Add />} onClick={handleClick}>Add</Button>
            </GridToolbarContainer>
        );
    }

    const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>,) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {

        updateSizes({ id: id as number } as RowSize, CrudActions.Delete)

    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = sizes.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setSizes(sizes.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        let updatedRow;

        if (newRow.isNew)
            updatedRow = updateSizes(newRow as RowSize, CrudActions.Add);
        else
            updatedRow = updateSizes(newRow as RowSize, CrudActions.Update);

        // const updatedRow = { ...newRow, isNew: false } as RowSizes;
        // setSizes(sizes.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleOnClose = () => {
        setError({ err: false, msg: '' })
    }

    const updateSizes = (size: RowSize, action: CrudActions) => {

        const id = size.id;

        const body = {
            "size": size.size
        }

        let addedSize: RowSize;

        switch (action) {
            case CrudActions.Add:

                setLoading(true);
                setTimeout(() => {
                    (async () => {
                        addSize(body).then(response => {
                            const respObj = response.data;
                            addedSize = {
                                id: respObj.id,
                                size: respObj.size,
                                isNew: false
                            };
                            setSizes(sizes.map((row) => (row.id === id ? addedSize : row)));
                            setLoading(false);

                        }, error => {
                            setError({ err: true, msg: 'Error adding size' });
                            setLoading(false);
                        });
                    })()
                }, 1000);
                break;
            case CrudActions.Delete:
                setLoading(true);
                setTimeout(() => {
                    (async () => {
                        deleteSize(id!).then(response => {
                            setSizes(sizes.filter((row) => row.id !== id));
                            setLoading(false);
                        }, error => {
                            setError({ err: true, msg: 'Error adding size data' });
                            setLoading(false);
                        });
                    })()
                }, 1000);

                break;
            case CrudActions.Update:
                setLoading(true);
                setTimeout(() => {
                    (async () => {
                        updateSize(id!, body).then(response => {
                            const respObj = response.data;
                            addedSize = {
                                id: respObj.id,
                                size: respObj.size,
                                isNew: false
                            };
                            setSizes(sizes.map((row) => (row.id === id ? addedSize : row)));
                            setLoading(false);
                        }, error => {
                            setError({ err: true, msg: 'Error updating size data' });
                            setLoading(false);
                        });
                    })()
                }, 1000);

                break;
            default:
                break

        }
    }

    return (
        <>
            {
                <Container className='container' sx={{ width: '430px' }}>
                    <Typography component="h2" variant='h6' sx={{ margin: 1, textAlign: 'center', marginBottom: 2 }}>Manage product sizes</Typography>
                    <DataGrid
                        //error={error.err}
                        loading={loading}
                        isRowSelectable={(params: GridRowParams) => params.row.quantity > 50000}
                        editMode="row"
                        getRowId={(row) => row.id}
                        rowModesModel={rowModesModel}
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        components={{
                            Toolbar: EditToolbar
                        }}
                        componentsProps={{
                            toolbar: { setSizes, setRowModesModel }
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                        columns={columns}
                        rows={sizes}
                        hideFooterSelectedRowCount
                        pageSize={10}></DataGrid>
                    <BasicSnackBar handleClose={handleOnClose} message={error.msg} open={error.err} severity="error" autoHideDuration={4000} />
                </Container>
            }

        </>

    )
}

export { Sizes }