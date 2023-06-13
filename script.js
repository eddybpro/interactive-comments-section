const main = document.querySelector('main'),
commentsWrapper = document.querySelector('.comments-wrapper');

async function getData(){
    const data = await fetch('data.json');
    const result = await data.json();
    console.log(result.comments);

    for(let i =0; i < result.comments.length; i++){
        const li = document.createElement('li');
        li.classList.add('comment');
        li.innerHTML=`
        <div class="comment-container">
        <div class="user-box">
            <img src="${result.comments[i].user.image.png}" alt="" class="avatar">
            <h3 class="user-name">
                ${result.comments[i].user.username}
            </h3>
            <p class="time">
            ${result.comments[i].createdAt}
            </p>
        </div>
        <textarea class="comment-txt" disabled>
${result.comments[i].content}
        </textarea>
        <div class="btns">
            <button class="plus-btn">
                <img src="images/icon-plus.svg" alt="" class="plus-icon">
            </button>
            <button class="rate-val">${result.comments[i].score}</button>
            <button class="minus-btn">
                <img src="images/icon-minus.svg" alt="" class="minus-icon">
            </button>
        </div>
        <button class="reply-btn">
            <img src="images/icon-reply.svg" class="reply-img" alt="">
            reply
        </button>
        </div>
    `;
    commentsWrapper.append(li);

    if(result.comments[i].replies.length > 0){
        const ul = document.createElement('ul');
        ul.classList.add('replies-wrapper');

        for (let j = 0; j < result.comments[i].replies.length; j++) {
            const liReply = document.createElement('li');

            liReply.classList.add('reply-li');
            liReply.innerHTML=`
            <div class="user-box">
                <img src="${result.comments[i].replies[j].user.image.png}" alt="" class="avatar">
                <h3 class="user-name">
                    ${result.comments[i].replies[j].user.username}
                </h3>
                <p class="${result.comments[i].replies[j].user.username=="juliusomo"?"juliusomo": "none"}">you</p>
                <p class="time">
                ${result.comments[i].replies[j].createdAt}
                </p>
            </div>
            <p class="reply-to">
            @${result.comments[i].replies[j].replyingTo},
            </p>
            <textarea class="comment-txt reply-txt" disabled>
${result.comments[i].replies[j].content}
            </textarea>
            <div class="btns">
                <button class="plus-btn">
                    <img src="images/icon-plus.svg" alt="" class="plus-icon">
                </button>
                <button class="rate-val">${result.comments[i].replies[j].score}</button>
                <button class="minus-btn">
                    <img src="images/icon-minus.svg" alt="" class="minus-icon">
                </button>
            </div>
            
            <button class="${result.comments[i].replies[j].user.username==="juliusomo"?"edit-btn": "none"}">
                <img src="images/icon-edit.svg" class="edit-img" alt="">
                edit
            </button>
            <button class="${result.comments[i].replies[j].user.username==="juliusomo"?"delete-btn": "none"}">
                <img src="images/icon-delete.svg" class="delete-img" alt="">
                delete
            </button>

            <button class="${result.comments[i].replies[j].user.username==="juliusomo"?"none": "reply-btn"}">
                <img src="images/icon-reply.svg" class="reply-img" alt="">
                reply
            </button>
        `;
            ul.append(liReply);
            commentsWrapper.children[i].append(ul);
        }
    }
    }

    const addComment = document.createElement('div');

    addComment.classList.add("add-comment-box");
    addComment.innerHTML=`
        <textarea class="add-comment" placeholder="Add a comment..."></textarea>
        <img src="./images/avatars/image-juliusomo.png" class="add-comment-avatar"/>
        <button class="send-btn">send</button>
    `
    commentsWrapper.append(addComment);

}

getData()

commentsWrapper.addEventListener('click', (e)=>{
    
    if(e.target.classList.contains('plus-icon')){
        e.target.parentElement.nextElementSibling.innerText = `${+e.target.parentElement.nextElementSibling.textContent+1}`;
    }
})

commentsWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('minus-icon')){
        
        e.target.parentElement.previousElementSibling.innerText = `${+e.target.parentElement.previousElementSibling.textContent-1 < 0?0: +e.target.parentElement.previousElementSibling.textContent-1}`;
    }
})

commentsWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('reply-btn') || e.target.classList.contains('reply-img')){
        const replyCheck = e.target.closest('ul');
        
        if(replyCheck.classList.contains('replies-wrapper')){
            const addReply = document.createElement('li');

            addReply.classList.add('add-reply');
            addReply.innerHTML=`
                <textarea class="add-comment">
@${e.target.parentElement.children[0].children[1].innerText},</textarea>
                <img src="./images/avatars/image-juliusomo.png" class="add-comment-avatar"/>
                <button class="add-reply-btn">
                reply</button>
            `;
            replyCheck.append(addReply)
        }else{
            if(e.target.parentElement.parentElement.lastElementChild.classList.contains('replies-wrapper')){
                const addReply = document.createElement('li');

            addReply.classList.add("add-reply");
            addReply.innerHTML=`
                <textarea class="add-comment">
@${e.target.parentElement.children[0].children[1].innerText},</textarea>
                <img src="./images/avatars/image-juliusomo.png" class="add-comment-avatar"/>
                <button class="add-reply-btn">
                reply</button>
            `;
            e.target.parentElement.parentElement.lastElementChild.append(addReply)
            }else{
                const repliesList = document.createElement('ul');
                repliesList.classList.add('replies-wrapper');
                const addReply = document.createElement('li');

            addReply.classList.add("add-reply");
            addReply.innerHTML=`
                <textarea class="add-comment">
@${e.target.parentElement.children[0].children[1].innerText},</textarea>
                <img src="./images/avatars/image-juliusomo.png" class="add-comment-avatar"/>
                <button class="add-reply-btn">
                reply</button>
            `;
            repliesList.append(addReply);
            e.target.parentElement.parentElement.append(repliesList);
            }
        }
        

    }
})

commentsWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('edit-btn')){
        e.target.parentElement.children[2].focus();
        e.target.parentElement.children[2].style.borderColor='hsl(238, 40%, 52%)';
        e.target.parentElement.children[2].disabled = false;
        const updateBtn = document.createElement('button');
        e.target.parentElement.append(updateBtn);
        updateBtn.classList.add('update-btn');
        updateBtn.textContent= 'update';
        e.target.parentElement.append(updateBtn);
        e.target.parentElement.children[3].style.opacity = '.5';
        e.target.parentElement.children[4].style.opacity = '.5';
        e.target.parentElement.children[5].style.opacity = '.5';
    }
})

commentsWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-btn')|| e.target.classList.contains('delete-img')){
        const popupMsg = document.createElement('div');
        popupMsg.classList.add('msg-box');
        popupMsg.innerHTML=`
        <h4 class='popup-title'>Delete comment</h4>
        <p class='warning-msg'>
        Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div class='warning-btns'>
        <button class='cancel-btn'>no,cancel</button>
        <button class='delete-btn-war'>yes,delete</button>
        </div>`;
        const height = e.target.offsetTop;
        
        main.append(popupMsg);
        popupMsg.style.top=`${height}px`;
        commentsWrapper.style.filter = 'blur(10px) brightness(40%)';
    }
})

main.addEventListener('click', (e)=>{
    if(e.target.classList.contains('cancel-btn')){main.removeChild(main.lastElementChild);
    commentsWrapper.style.filter = 'blur(0px) brightness(100%)';
    }
})









