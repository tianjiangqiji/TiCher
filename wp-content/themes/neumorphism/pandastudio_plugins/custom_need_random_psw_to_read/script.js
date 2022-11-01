(function($) {
	$(document).on('click', '.need_random_psw_to_read__title__read', function(event) {
		var wrapper = $(this).parent().parent();
		var text = wrapper.attr('data-text');
		var randomNum = Math.floor(Math.random()*8997+1001);
		$("body").append(
			'<div class="need_random_psw_to_read--fullscreen disappear">\
				<div class="secWrapper">\
					<div class="inputWrapper">\
						<input type="password" placeholder="请输入：'+randomNum+'" /><span class="pass_tip">'+randomNum+'</span>\
					</div>\
					<div class="keybord">\
						<table width="100%">\
							<tbody>\
								<tr><td>1</td><td>2</td><td>3</td></tr>\
								<tr><td>4</td><td>5</td><td>6</td></tr>\
								<tr><td>7</td><td>8</td><td>9</td></tr>\
								<tr><td class="smaller">取消</td><td>0</td><td class="smaller">清空</td></tr>\
							</tbody>\
						</table>\
					</div>\
				</div>\
			</div>'
		)
		window.setTimeout(function(){
			$('.need_random_psw_to_read--fullscreen').removeClass('disappear');
		},16)
		var validate = function() {
			var number = $(this).html();
			var input = $('.need_random_psw_to_read--fullscreen input');

			if (number == "清空") {
				input.val('');
				$('.need_random_psw_to_read--fullscreen .pass_tip').removeClass('show');
			} else if(number == "取消") {
				close();
				return false;
			} else {
				input.val(input.val() + number);
				$('.need_random_psw_to_read--fullscreen .pass_tip').addClass('show');
			}

			check();

			function close() {
				$('.need_random_psw_to_read--fullscreen').addClass('disappear');
				window.setTimeout(function(){
					$('.need_random_psw_to_read--fullscreen').remove();
				},500)
			}

			function check() {
				var input = $('.need_random_psw_to_read--fullscreen input');
				var randomNum = $('.need_random_psw_to_read--fullscreen .pass_tip').html();
				if (input.val() == randomNum) {
					close();
					var decode = decodeURIComponent(escape(window.atob( text )));
					decode = decode.replace(/\n/,"<br>");
					wrapper.append('\
						<div class="need_random_psw_to_read__content" style="display:none">\
							'+decode+'\
						</div>\
					');
					wrapper.find('.need_random_psw_to_read__title__read').remove();
					wrapper.addClass('data-is-show');
					window.setTimeout(function(){
						wrapper.find('.need_random_psw_to_read__content').slideDown();
					},300)
				}
			}
		}

		$(".need_random_psw_to_read--fullscreen input").keyup(validate)

		$('.need_random_psw_to_read--fullscreen td').click(validate);
	});
})(jQuery);