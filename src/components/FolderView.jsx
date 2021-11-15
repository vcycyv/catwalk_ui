import React, { useEffect } from 'react';
import { Modal, Tree, Form, Input, Button } from 'antd';
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { folderService } from '../services';

const { confirm } = Modal;

export const FolderView = ({ handleOk, handleCancel, visible }) => {
    const [folderNameModalVisible, setFolderNameModalVisible] = React.useState(false);
    const [folders, setFolders] = React.useState([]);
    const [folderModalTitle, setFolderModalTitle] = React.useState("");
    const [folderModalAction, setFolderModelAction] = React.useState("");
    const [defaultFolderName, setDefaultFolderName] = React.useState("");
    const [folderName, setFolderName] = React.useState("");
    const [currentNode, setCurrentNode] = React.useState();

    useEffect(() => {
        folderService.getFolders()
            .then(
                response => {
                    if (response.status < 300) {
                        setFolders(response.data)
                    } else {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <>
                                    It failed to get folders:
                                    <br />
                                    &nbsp;&nbsp;{response.data.message}
                                </>
                            )
                        })
                    }
                }
            )
    }, [])

    const getData = () => {
        folders.sort(function (a, b) {
            return a.Path > b.Path ? 1 : -1;
        })
        var data = [];
        for (let i = 0; i < folders.length; i++) {
            if (!folders[i].Path.includes(".")) {
                data.push({ "title": folders[i].Path, "key": folders[i].ID, "children": [], "path": folders[i].Path })
            } else {
                let parentPath = folders[i].Path.substring(0, folders[i].Path.lastIndexOf("."));
                let parentParts = parentPath.split(".")
                var currentFolder = data;
                for (let j = 0; j < parentParts.length; j++) { //locate the existing parent folder
                    for (let subfolder of currentFolder) {
                        if (parentParts[j] === subfolder["title"]) {
                            currentFolder = subfolder["children"];
                            break;
                        }
                    }
                }
                currentFolder.push({ "title": folders[i].Path.substring(folders[i].Path.lastIndexOf(".") + 1), "key": folders[i].ID, "children": [], "path": folders[i].Path })
                currentFolder = data;
            }
        }
        return data;
    }

    const onTreeNodeSelect = (selectedKeys, info) => {
        if (selectedKeys.length === 1) {
            console.log({ id: selectedKeys[0], title: info.node.title })
            setCurrentNode({ id: selectedKeys[0], title: info.node.title, path: info.node.path })
        }
    };

    const handleFolderAction = () => {
        if (folderModalAction === "add") {
            folderService.addFolder(currentNode["id"], folderName)
                .then(
                    () => {
                        return folderService.getFolders();
                    }
                ).then(
                    response => {
                        setFolders(response.data)
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                    }
                )
        } else if (folderModalAction === "edit") {
            folderService.editFolder(currentNode["id"], folderName)
                .then(
                    () => {
                        return folderService.getFolders();
                    }
                ).then(
                    response => {
                        setFolders(response.data)
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                    }
                )
        }
        setFolderNameModalVisible(false);
    }

    const onDeleteFolder = () => {
        confirm({
            title: 'Do you want to delete this folder?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                folderService.deleteFolder(currentNode["id"])
                    .then(
                        () => {
                            return folderService.getFolders();
                        }
                    ).then(
                        response => {
                            setFolders(response.data)
                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                        }
                    )
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const handleFolderNameChange = (e) => {
        console.log("folder name: ", e.target.value)
        setFolderName(e.target.value);
    }

    const handleFolderNameCancel = () => {
        setFolderNameModalVisible(false);
    }

    const onCreateFolderModal = () => {
        setFolderModalTitle("Add a Folder");
        setFolderModelAction("add");
        setDefaultFolderName("");
        setFolderNameModalVisible(true);
    }

    const onEditFolderModal = () => {
        setFolderModalTitle("Rename a Folder");
        setFolderModelAction("edit");
        setDefaultFolderName(currentNode["title"])
        setFolderNameModalVisible(true);
    }

    const onFolderModalOK = () => {
        handleOk({"path":currentNode.path, "id": currentNode.key})
    }

    return (
        <>
            <Modal title="Folders" visible={visible} onOk={onFolderModalOK} onCancel={handleCancel} >
                <div style={{ display: "flex", justifyContent: 'flex-end', marginBottom: '5px' }}>
                    <Button shape="circle" icon={<MdOutlineCreateNewFolder />} onClick={onCreateFolderModal} /> &nbsp;
                    <Button shape="circle" icon={<FaRegEdit />} onClick={onEditFolderModal} /> &nbsp;
                    <Button shape="circle" icon={<AiOutlineDelete onClick={onDeleteFolder} />} />
                </div>
                <Tree
                    treeData={getData()}
                    onSelect={onTreeNodeSelect}
                    style={{ maxHeight: '500px', overflowY: 'auto' }}
                />
            </Modal>
            {
                folderNameModalVisible ?
                    <Modal title={folderModalTitle} visible={folderNameModalVisible} onOk={handleFolderAction} onCancel={handleFolderNameCancel}>
                        <div>
                            <Form name="form"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 6 }}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Folder Name"
                                    rules={[{ required: true, message: 'Please input folder name' }]}>
                                    <Input name="username" onChange={handleFolderNameChange} defaultValue={defaultFolderName} />
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                    :
                    null
            }
        </>
    )
}