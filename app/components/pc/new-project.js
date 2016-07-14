/**
* 新建project app/components/pc/new-project.js
* @Author: ubuntuvim
* @Date:   2016-06-25T00:24:36+08:00
* @Last modified by:   ubuntuvim
* @Last modified time: 2016-07-09T14:08:51+08:00
*/
import Ember from 'ember';

export default Ember.Component.extend({
    //校验
    projNameValidate: Ember.computed.notEmpty('projName'),

    actions: {
        saveCategory() {
            // 显示loading图片
            Ember.$("#loginLoading").show();
            // 按钮变为不可用
            Ember.$("#submitBtn").attr('disabled', true);
            // var inputStyle = Ember.$("#addCategoryForm .modal-dialog .modal-content .modal-body .form-group");
            // inputStyle.removeClass('has-error');
            var projName = this.get('projName');
            // console.log("projName --- " + projName);
            if (projName) {
                var userId = sessionStorage.getItem("__LOGIN_USER_ID__");
                Ember.Logger.debug("保存category userId: " + userId);
                if (!userId) {
                    location.reload(); //获取不到userid退出，让用户再次登录
                }
                let user = this.store.peekRecord('user', userId);
                var project = this.store.createRecord("project", {
                    userId: userId,
                    projName: projName,
                    timestamp: new Date().getTime(),  //项目创建时间
                    projStatus: 1  // 项目状态：1-正常；2-删除；3-过期
                    // user: user
                });
                // 设置与user的关联关系
                user.get('projects').pushObject(project);
                project.save().then(() => {
                    user.save().then(() => {
                        this.set('projName', '');  //清空
                        //关闭窗口
                        Ember.$("#newCategoryId").modal('toggle');
                        // 隐藏loading图片
                        Ember.$("#loginLoading").hide();
                        // 按钮变为可用
                        Ember.$("#submitBtn").attr('disabled', false);
                    });
                });

            } else {
                // 提示不允许为空
                // inputStyle.addClass('has-error');
                // 隐藏loading图片
                Ember.$("#loginLoading").hide();
                // 按钮变为可用
                Ember.$("#submitBtn").attr('disabled', false);
            }
        }
    }
});